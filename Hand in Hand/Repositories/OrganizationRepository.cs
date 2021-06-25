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
                        SELECT Id, FirebaseUserId, [Name], Url, Location, Phone, Email, ContactPerson
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
                            Name = DbUtils.GetString(reader, "Name"),
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
                    cmd.CommandText = @"INSERT INTO Organization (FirebaseUserId, Name, Url, Location, Phone, Email, ContactPerson)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Name, @Url, @Location, @Phone, @Email, @ContactPerson)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", organization.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", organization.Name);
                    DbUtils.AddParameter(cmd, "@Url", organization.Url);
                    DbUtils.AddParameter(cmd, "@Location", organization.Location);
                    DbUtils.AddParameter(cmd, "@Phone", organization.Phone);
                    DbUtils.AddParameter(cmd, "@Email", organization.Email);
                    DbUtils.AddParameter(cmd, "@ContactPerson", organization.ContactPerson);

                    organization.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}

