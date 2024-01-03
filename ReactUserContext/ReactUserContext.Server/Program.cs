using System.Reflection;
using Duende.Bff.Yarp;


IConfigurationBuilder configBuilder = new ConfigurationBuilder();
configBuilder
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();
IConfiguration config = configBuilder.Build();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddBff(options => 
    {
        // default value
        options.ManagementBasePath = "/bff";
    });



//temp authn bypass subfloor
builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = "cookie";
        options.DefaultChallengeScheme = "oidc";
        options.DefaultSignOutScheme = "oidc";
    })
    .AddCookie("cookie", options =>
    {
        // set session lifetime
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        
        // sliding or absolute
        options.SlidingExpiration = false;

        // host prefixed cookie name
        options.Cookie.Name = "__Host-spa";
        
        // strict SameSite handling
        options.Cookie.SameSite = SameSiteMode.Strict;
    })
    .AddOpenIdConnect("oidc", options =>
    {
        options.Authority = "https://login.identity.events";
        
        // confidential client using code flow + PKCE
        options.ClientId = "be37188a-3c55-4184-9fd9-d022ac76c50e";
        options.ClientSecret = "7Crps15 TRE)!TK$Y( tBKuXtCE8L";
        options.ResponseType = "code";

        // query response type is compatible with strict SameSite mode
        options.ResponseMode = "query";

        // get claims without mappings
        options.MapInboundClaims = false;
        options.GetClaimsFromUserInfoEndpoint = true;
        
        // save tokens into authentication session
        // to enable automatic token management
        options.SaveTokens = true;

        // request scopes
        options.Scope.Clear();
        options.Scope.Add("openid");
        options.Scope.Add("profile");

        // and refresh token
        options.Scope.Add("offline_access");
    });


//end temp authn


builder.Services.AddMvc();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseAuthentication();
app.UseBff();
app.UseAuthorization();

app.UseEndpoints(endpoints => {
    endpoints.MapBffManagementEndpoints();
});

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
