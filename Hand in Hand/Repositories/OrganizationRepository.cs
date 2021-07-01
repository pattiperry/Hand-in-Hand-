using Hand_in_Hand.Models;
using Hand_in_Hand.Utils;
using Microsoft.Extensions.Configuration;


namespace Hand_in_Hand.Repositories
{
    public class OrganizationRepository : BaseRepository, IOrganizationRepository
    {
        public OrganizationRepository(IConfiguration configuration) : base(configuration) { }

        public Organization GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, OrganizationName, Url, Location, Phone, Email, ContactPerson
                        FROM Organization
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    Organization organization = null;
                    //Execute the query
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        organization = new Organization()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            OrganizationName = DbUtils.GetString(reader, "OrganizationName"),
                            Url = DbUtils.GetString(reader, "Url"),
                            Location = DbUtils.GetString(reader, "Location"),
                            Phone = DbUtils.GetString(reader, "Phone"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ContactPerson = DbUtils.GetString(reader, "ContactPerson"),
                            
                        };
                    }
                    reader.Close();

                    return organization;
                }
            }
        }

        public void Add(Organization organization)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Organization (FirebaseUserId, OrganizationName, Url, Location, Phone, Email, ContactPerson)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @OrganizationName, @Url, @Location, @Phone, @Email, @ContactPerson)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", organization.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@OrganizationName", organization.OrganizationName);
                    DbUtils.AddParameter(cmd, "@Url", organization.Url);
                    DbUtils.AddParameter(cmd, "@Location", organization.Location);
                    DbUtils.AddParameter(cmd, "@Phone", organization.Phone);
                    DbUtils.AddParameter(cmd, "@Email", organization.Email);
                    DbUtils.AddParameter(cmd, "@ContactPerson", organization.ContactPerson);

                    organization.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Organization organization)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Organization
                                        SET OrganizationName = @OrganizationName,
                                            Url = @Url,
                                            Location = @Location,
                                            Phone = @Phone,
                                            Email = @Email,
                                            ContactPerson = @ContactPerson
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", organization.Id);
                    cmd.Parameters.AddWithValue("@OrganizationName", organization.OrganizationName);
                    cmd.Parameters.AddWithValue("@Url", organization.Url);
                    cmd.Parameters.AddWithValue("@Location", organization.Location);
                    cmd.Parameters.AddWithValue("@Phone", organization.Phone);
                    cmd.Parameters.AddWithValue("@Email", organization.Email);
                    cmd.Parameters.AddWithValue("@ContactPerson", organization.ContactPerson);


                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

