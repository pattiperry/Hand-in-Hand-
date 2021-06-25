using Hand_in_Hand.Models;
using Hand_in_Hand.Utils;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hand_in_Hand.Repositories
{
    public class OpportunityRepository: BaseRepository, IOpportunityRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }
        public List<Post> GetAllPublishedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                        ORDER BY PublishDateTime DESC";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
        // Method to retrieve details of post.
        public Post GetById(int id)
        {
            // Define a variable to identify the database connection
            // ("Connection" comes from the BaseRepository.cs)
            using (var conn = Connection)
            {
                conn.Open();
                // Open the connection to the database.
                using (var cmd = conn.CreateCommand())
                {
                    // Instantiate a variable called cmd to use as short-hand for defining the SQL query.
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName,
                              pt.Id as PostTagId,
                              t.Id AS TagId, t.[Name] AS TagName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                              LEFT JOIN PostTag pt ON p.Id = pt.PostId
                              LEFT JOIN Tag t ON pt.TagId = t.Id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                              AND p.id = @id";
                    // Attach the UserId parameter to the SQL Query using SQLConnection provided methods
                    cmd.Parameters.AddWithValue("@id", id);
                    // Execute the Query
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = NewPostFromReader(reader);
                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            post.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName"),
                                PostTagId = DbUtils.GetInt(reader, "PostTagId")
                            });
                        }
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        // Define a public method to retrieve Posts from the database that correspond to a
        // particular userId and return a list of posts.
        public List<Post> GetPostsByUserId(int UserId)
        {
            // Define a variable to identify the database connection
            // ("Connection" comes from the BaseRepository.cs)
            using (var conn = Connection)
            {
                // Open the connection to the database.
                conn.Open();
                // Instantiate a variable called cmd to use as short-hand for defining the SQL query.
                using (var cmd = conn.CreateCommand())
                {
                    // Define the SQL query. Select Post, Category, UserProfile, and UserType.
                    // Join Category on Post via CategoryId
                    // Join UserProfile on Post via UserProfileId
                    // Join UserType on UserProfile via UserTypeId
                    // Only Select Entries WHERE the UserId = the current user's Id
                    // Order by descending (chronological) 
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE u.Id = @id AND IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                        ORDER BY p.CreateDateTime DESC";

                    // Attach the UserId parameter to the SQL Query using SQLConnection provided methods
                    cmd.Parameters.AddWithValue("@id", UserId);

                    // Execute the Query
                    var reader = cmd.ExecuteReader();

                    // Instantiate a new list of posts
                    List<Post> posts = new List<Post>();

                    // While there are new rows of entries in the reader,
                    while (reader.Read())
                    {
                        // Use the defined method "NewPostFromReader" (defined below)
                        // to add a new Post object to the List of Posts
                        posts.Add(NewPostFromReader(reader));
                    }

                    // Close the connection to the database
                    reader.Close();

                    // return the list of posts
                    return posts;
                }
            }
        }

        public void Add(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
                            IsApproved, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
                            @IsApproved, @CategoryId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(post.ImageLocation));
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PublishDateTime", DbUtils.ValueOrDBNull(post.PublishDateTime));
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                    //return post;
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM PostTag WHERE PostTag.PostId = @Id;
                            DELETE FROM Post WHERE Post.Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Edit(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post
                                        SET Title = @title,
                                            Content = @content,
                                            CategoryId = @categoryId,
                                            ImageLocation = @imageLocation,
                                            PublishDateTime = @publishDate,
                                            IsApproved = @isApproved
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", post.Id);
                    cmd.Parameters.AddWithValue("@title", post.Title);
                    cmd.Parameters.AddWithValue("@content", post.Content);
                    cmd.Parameters.AddWithValue("@categoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@imageLocation", post.ImageLocation);
                    cmd.Parameters.AddWithValue("@publishDate", post.PublishDateTime);
                    cmd.Parameters.Add("@isApproved", SqlDbType.Bit).Value = post.IsApproved;

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Opportunity NewOpportunityFromReader(SqlDataReader reader)
        {
            return new Opportunity()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = DbUtils.GetNullableString(reader, "Title"),
                Content = DbUtils.GetNullableString(reader, "Content"),
                Location = DbUtils.GetNullableString(reader, "Location"),
                OpportunityTypeId = reader.GetInt32(reader.GetOrdinal("OpportunityTypeId")),
                SuitableForId = reader.GetInt32(reader.GetOrdinal("SuitableForId")),
                OtherInfo = DbUtils.GetNullableString(reader, "OtherInfo"),
                OrganizationId = reader.GetInt32(reader.GetOrdinal("OrganizationId")),
                Organization = new Organization()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("OrganizationId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                
            };
        }
    }
}

