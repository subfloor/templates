using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace BackendApiHost
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddAuthentication("token")
                .AddJwtBearer("token", options =>
                {
                    //options.Authority = "https://demo.duendesoftware.com";
                    options.Authority = "https://login.identity.events";
                    options.Audience = "todos";

                    options.MapInboundClaims = false;
                });

            services.AddAuthorization(options =>
            {
            
              options.AddPolicy("ApiCaller", policy =>
              {
                  policy.RequireClaim("scope", "todos");
              });

            options.AddPolicy("RequireInteractiveUser", policy =>
            {
                policy.RequireClaim("sub");
            });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers()
                    .RequireAuthorization("ApiCaller");

                endpoints.MapControllers();
            });
        }
    }
}
