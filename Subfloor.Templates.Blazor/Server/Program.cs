using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using Subfloor.Dotnet;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((ctx, lc) => lc
        .MinimumLevel.Information()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
        .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
        .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
        .MinimumLevel.Override("IdentityModel", LogEventLevel.Debug)
        .MinimumLevel.Override("Duende.Bff", LogEventLevel.Debug)
        .Enrich.FromLogContext()
        .WriteTo.Console(
            outputTemplate:
            "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}",
            theme: AnsiConsoleTheme.Code));

    builder.Services.AddHttpClient();
    builder.Services.AddHttpContextAccessor();

    builder.Services.AddControllers();
    builder.Services.AddRazorPages();
    builder.Services.AddBff();

    builder.Services.AddSubfloorAuthentication();

    ////this section will be replaced with a webstartupextension method (e.g. AddSubfloorAuthentication())
    //var Configuration = builder.Services.BuildServiceProvider().GetService<IConfiguration>();
    //var subfloorConfig = Configuration.GetSection("Subfloor");

    //builder.Services.AddAuthentication(options =>
    //{
    //    options.DefaultScheme = "cookie";
    //    options.DefaultChallengeScheme = "oidc";
    //    options.DefaultSignOutScheme = "oidc";
    //})
    //    .AddCookie("cookie", options =>
    //    {
    //        options.Cookie.Name = "__Host-blazor";
    //        options.Cookie.SameSite = SameSiteMode.Strict;
    //    })
    //    .AddOpenIdConnect("oidc", options =>
    //    {
    //        //options.Authority = "https://demo.duendesoftware.com";

    //        //// confidential client using code flow + PKCE
    //        //options.ClientId = "interactive.confidential";
    //        //options.ClientSecret = "secret";

    //        options.Authority = subfloorConfig.GetValue<string>("Identity:Authority");
    //        options.ClientId = subfloorConfig.GetValue<string>("Identity:Client_Id"); ;
    //        options.ClientSecret = subfloorConfig.GetValue<string>("Identity:ClientSecret"); ;

    //        options.ResponseType = "code";
    //        options.ResponseMode = "query";

    //        options.MapInboundClaims = false;
    //        options.GetClaimsFromUserInfoEndpoint = true;
    //        options.SaveTokens = true;

    //        // request scopes + refresh tokens
    //        options.Scope.Clear();
    //        options.Scope.Add("openid");
    //        options.Scope.Add("profile");
    //        //options.Scope.Add("api");
    //        options.Scope.Add("offline_access");
    //    });


    ////end auth section to be replaced by webstartupextension


    var app = builder.Build();

    app.UseSerilogRequestLogging();

    if (app.Environment.IsDevelopment())
    {
        app.UseWebAssemblyDebugging();
    }
    else
    {
        app.UseExceptionHandler("/Error");
    }

    app.UseBlazorFrameworkFiles();
    app.UseStaticFiles();

    app.UseRouting();
    app.UseAuthentication();
    app.UseBff();
    app.UseAuthorization();

    app.MapBffManagementEndpoints();
    app.MapRazorPages();

    app.MapControllers()
        .RequireAuthorization()
        .AsBffApiEndpoint();

    app.MapFallbackToFile("index.html");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}