var builder = WebApplication.CreateBuilder(args);

const string AngularDevCorsPolicy = "AngularDevCors";

// NOTE: Controllers are registered so the real API can be built here later
// (e.g. Controllers for News, Athletes, Events, Auth, etc.) or so this project
// can act as a lightweight BFF that forwards to an external API.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(AngularDevCorsPolicy, policy =>
    {
        policy.WithOrigins("https://localhost:4200", "http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.UseCors(AngularDevCorsPolicy);
else
    app.UseHsts();

app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

// SPA fallback: any route that isn't an API call or a static asset is handed
// to Angular's router (index.html), which is served from wwwroot in production
// builds or proxied to `ng serve` in Development via Microsoft.AspNetCore.SpaProxy.
app.MapFallbackToFile("/index.html");

app.Run();