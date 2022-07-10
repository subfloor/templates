public static class AttendeesEndpointMappingMiddlewareExtensions
{
    public static IApplicationBuilder UseSubfloorEchoApi(
        this IApplicationBuilder app
        )
    {
        app.UseEndpoints(endpoints =>
        {            
            //  simple echo
            endpoints.MapGet("/api/echo/{echoValue}", async (string echoValue) =>
            {
                return $"Echo: {echoValue}";
            });


        });
        return app;
    }
}

