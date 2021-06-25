CREATE TABLE [Organization] (
  [Id] integer PRIMARY KEY,
  [Name] nvarchar(255),
  [Url] nvarchar(255),
  [Location] nvarchar(255),
  [Phone] nvarchar(255),
  [Email] nvarchar(255),
  [ContactPerson] nvarchar(255)
)
GO

CREATE TABLE [Volunteer] (
  [Id] integer PRIMARY KEY,
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Email] nvarchar(255)
)
GO

CREATE TABLE [Opportunity] (
  [Id] integer PRIMARY KEY,
  [Title] nvarchar(255),
  [Content] nvarchar(255),
  [OrganizationId] integer,
  [Location] nvarchar(255),
  [OpportunityTypeId] integer,
  [SuitableForId] integer,
  [OtherInfo] nvarchar(255)
)
GO

CREATE TABLE [OpportunityType] (
  [Id] integer PRIMARY KEY,
  [Project] nvarchar(255),
  [Ongoing] nvarchar(255)
)
GO

CREATE TABLE [SuitableFor] (
  [Id] integer PRIMARY KEY,
  [Groups] bit,
  [Individuals] bit,
  [AdultsOnly] bit,
  [AllAges] bit,
  [ParticipateFromHome] bit
)
GO

ALTER TABLE [Opportunity] ADD FOREIGN KEY ([OrganizationId]) REFERENCES [Organization] ([Id])
GO

ALTER TABLE [Opportunity] ADD FOREIGN KEY ([OpportunityTypeId]) REFERENCES [OpportunityType] ([Id])
GO

ALTER TABLE [Opportunity] ADD FOREIGN KEY ([SuitableForId]) REFERENCES [SuitableFor] ([Id])
GO
