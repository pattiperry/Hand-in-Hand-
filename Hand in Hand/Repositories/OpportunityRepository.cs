using Hand_in_Hand.Models;
using Hand_in_Hand.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hand_in_Hand.Repositories
{
    public class OpportunityRepository: BaseRepository, IOpportunityRepository
    {
        public OpportunityRepository(IConfiguration config) : base(config) { }
        public List<Opportunity> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT o.Id, o.Title, o.Content, 
                              o.Location, o.OrganizationId, o.Type, o.SuitableForGroups, o.SuitableForIndividuals, o.SuitableForAdultsOnly, o.SuitableForAllAges, o.SuitableForParticipateFromHome,
                              o.OtherInfo, oz.Id as OrganizationId, oz.OrganizationName, oz.ContactPerson, oz.Url, oz.Phone, oz.Email
                         FROM Opportunity o
                              LEFT JOIN Organization oz ON o.OrganizationId = oz.id
                              ";

                    var reader = cmd.ExecuteReader();

                    var opportunities = new List<Opportunity>();

                    while (reader.Read())
                    {
                        opportunities.Add(NewOpportunityFromReader(reader));
                    }

                    reader.Close();

                    return opportunities;
                }
            }
        }
        // Method to retrieve details of opportunity.
        public Opportunity GetById(int id)
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
                       SELECT o.Id, o.Title, o.Content, 
                              o.Location, o.OrganizationId, o.Type, o.SuitableForGroups, o.SuitableForIndividuals, o.SuitableForAdultsOnly, o.SuitableForAllAges, o.SuitableForParticipateFromHome,
                              o.OtherInfo, oz.Id as OrganizationId, oz.OrganizationName, oz.ContactPerson, oz.Url, oz.Phone, oz.Email
                         FROM Opportunity o
                              LEFT JOIN Organization oz ON o.OrganizationId = oz.id
                        WHERE o.id = @id";
                    // Attach the UserId parameter to the SQL Query using SQLConnection provided methods
                    cmd.Parameters.AddWithValue("@id", id);
                    // Execute the Query
                    var reader = cmd.ExecuteReader();

                    Opportunity opportunity = null;

                    while (reader.Read())
                    {
                        if (opportunity == null)
                        {
                            opportunity = NewOpportunityFromReader(reader);
                        } 
                    }

                    reader.Close();

                    return opportunity;
                }
            }
        }

        
        
        public void Add(Opportunity opportunity)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO OPPORTUNITY (
                            Title, Content, Location, OrganizationId, Type,
                            SuitableForGroups, SuitableForIndividuals, SuitableForAdultsOnly, SuitableForAllAges, SuitableForParticipateFromHome, OtherInfo )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @Location, @OrganizationId, @Type,
                            @SuitableForGroups, @SuitableForIndividuals, @SuitableForAdultsOnly, @SuitableForAllAges, @SuitableForParticipateFromHome, @OtherInfo )";
                    cmd.Parameters.AddWithValue("@Title", opportunity.Title);
                    cmd.Parameters.AddWithValue("@Content", opportunity.Content);
                    cmd.Parameters.AddWithValue("@Location", DbUtils.ValueOrDBNull(opportunity.Location));
                    cmd.Parameters.AddWithValue("@OrganizationId", DbUtils.ValueOrDBNull(opportunity.OrganizationId));
                    cmd.Parameters.AddWithValue("@Type", DbUtils.ValueOrDBNull(opportunity.Type));
                    cmd.Parameters.AddWithValue("@SuitableForGroups", DbUtils.ValueOrDBNull(opportunity.SuitableForGroups));
                    cmd.Parameters.AddWithValue("@SuitableForIndividuals", DbUtils.ValueOrDBNull(opportunity.SuitableForIndividuals));
                    cmd.Parameters.AddWithValue("@SuitableForAdultsOnly", DbUtils.ValueOrDBNull(opportunity.SuitableForAdultsOnly));
                    cmd.Parameters.AddWithValue("@SuitableForAllAges", DbUtils.ValueOrDBNull(opportunity.SuitableForAllAges));
                    cmd.Parameters.AddWithValue("@SuitableForParticipateFromHome", DbUtils.ValueOrDBNull(opportunity.SuitableForParticipateFromHome));
                    cmd.Parameters.AddWithValue("@OtherInfo", DbUtils.ValueOrDBNull(opportunity.OtherInfo));
                    

                    opportunity.Id = (int)cmd.ExecuteScalar();
                    //return opportunity;
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
                           
                            DELETE FROM Opportunity WHERE Opportunity.Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Edit(Opportunity opportunity)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Opportunity
                                        SET Title = @title,
                                            Content = @content,
                                            Location = @location,
                                            Type = @type,
                                            SuitableForGroups = @suitableForGroups,
                                            SuitableForIndividuals =@suitableForIndividuals,
                                            SuitableForAdultsOnly =@suitableForAdultsOnly,
                                            SuitableForAllAges =@suitableForAllAges,
                                            SuitableForParticipateFromHome =@suitableForParticipateFromHome,
                                            OrganizationId = @organizationId,
                                            OtherInfo = @otherInfo
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", opportunity.Id);
                    cmd.Parameters.AddWithValue("@title", opportunity.Title);
                    cmd.Parameters.AddWithValue("@content", opportunity.Content);
                    cmd.Parameters.AddWithValue("@location", opportunity.Location);
                    cmd.Parameters.AddWithValue("@type", opportunity.Type);
                    cmd.Parameters.AddWithValue("@suitableForGroups", opportunity.SuitableForGroups);
                    cmd.Parameters.AddWithValue("@suitableForIndividuals", opportunity.SuitableForIndividuals);
                    cmd.Parameters.AddWithValue("@suitableForAdultsOnly", opportunity.SuitableForAdultsOnly);
                    cmd.Parameters.AddWithValue("@suitableForAllAges", opportunity.SuitableForAllAges);
                    cmd.Parameters.AddWithValue("@suitableForParticipateFromHome", opportunity.SuitableForParticipateFromHome);
                    cmd.Parameters.AddWithValue("@organizationId", opportunity.OrganizationId);
                    cmd.Parameters.AddWithValue("@otherInfo", opportunity.OtherInfo);
                    
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Opportunity NewOpportunityFromReader(SqlDataReader reader)
        {
            var opportunity = new Opportunity();
            {

            opportunity.Id = reader.GetInt32(reader.GetOrdinal("Id"));
            opportunity.Title = reader.GetString(reader.GetOrdinal("Title"));
            opportunity.Content = reader.GetString(reader.GetOrdinal("Content"));
            opportunity.Location = DbUtils.GetNullableString(reader, "Location");
            opportunity.Type = reader.GetBoolean(reader.GetOrdinal("Type"));
            opportunity.SuitableForGroups = reader.GetBoolean(reader.GetOrdinal("SuitableForGroups"));
            opportunity.SuitableForIndividuals = reader.GetBoolean(reader.GetOrdinal("SuitableForIndividuals"));
            opportunity.SuitableForAdultsOnly = reader.GetBoolean(reader.GetOrdinal("SuitableForAdultsOnly"));
            opportunity.SuitableForAllAges = reader.GetBoolean(reader.GetOrdinal("SuitableForAllAges"));
            opportunity.SuitableForParticipateFromHome = reader.GetBoolean(reader.GetOrdinal("SuitableForParticipateFromHome"));
            opportunity.OtherInfo = DbUtils.GetNullableString(reader, "OtherInfo");
            opportunity.OrganizationId = (int)DbUtils.GetNullableInt(reader, "OrganizationId");
            opportunity.organization = new Organization()
            {
                Id = reader.GetInt32(reader.GetOrdinal("OrganizationId")),
                OrganizationName = reader.GetString(reader.GetOrdinal("OrganizationName")),
                Url = DbUtils.GetString(reader, "Url"),
                Location = DbUtils.GetString(reader, "Location"),
                Phone = DbUtils.GetString(reader, "Phone"),
                Email = DbUtils.GetString(reader, "Email"),
                ContactPerson = DbUtils.GetString(reader, "ContactPerson")
            };

            return opportunity;
        }
        }
    }
}

