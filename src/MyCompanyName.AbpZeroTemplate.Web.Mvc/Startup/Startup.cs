using System;
using System.IO;
using Abp.AspNetCore;
using Abp.AspNetCore.SignalR.Hubs;
using Abp.AspNetZeroCore.Web.Authentication.JwtBearer;
using Abp.Castle.Logging.Log4Net;
using Abp.Hangfire;
using Abp.PlugIns;
using Castle.Facilities.Logging;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.Configuration;
using MyCompanyName.AbpZeroTemplate.Configure;
using MyCompanyName.AbpZeroTemplate.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Identity;
using MyCompanyName.AbpZeroTemplate.Schemas;
using MyCompanyName.AbpZeroTemplate.Web.Chat.SignalR;
using MyCompanyName.AbpZeroTemplate.Web.Common;
using MyCompanyName.AbpZeroTemplate.Web.Resources;
using MyCompanyName.AbpZeroTemplate.Web.IdentityServer;
using MyCompanyName.AbpZeroTemplate.Web.Swagger;
using Stripe;
using System.Reflection;
using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.Mvc.Antiforgery;
using Abp.AspNetCore.Mvc.Extensions;
using HealthChecks.UI.Client;
using IdentityServer4.Configuration;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MyCompanyName.AbpZeroTemplate.Web.HealthCheck;
using Owl.reCAPTCHA;
using HealthChecksUISettings = HealthChecks.UI.Configuration.Settings;
using System.Text;

//  datdd
using Z.Dapper.Plus;
using Z.EntityFramework.Extensions;
using Z.BulkOperations;
using Z.Expressions;
//using Z.EntityFramework.Classic;
using Z.EntityFramework.Plus;
using Z.LinqToSql.Plus;

namespace MyCompanyName.AbpZeroTemplate.Web.Startup
{
    public class Startup
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IWebHostEnvironment _hostingEnvironment;
        IServiceCollection _services;

        public Startup(IWebHostEnvironment env)
        {
            //  datdd
            //////////////////////////////////////////////////////////////////////////////////////////////////
            ////sql driver only
            //DapperPlusManager.AddLicense("304;701-DELTAFOX", "3F26240-F4C9C0B-D5C9F79-9D0D5AA-A907");
            ////All driver all
            //DapperPlusManager.AddLicense("816;700-DUONGDUCDAT", "51F1311-F20F0EB-74F0834-F27747F-B9E4");
            // CHECK if the license is valid for the default provider (SQL Server)
            //string licenseErrorMessage;
            //string output = Z.Dapper.Plus.DapperPlusManager.ValidateLicense(DapperProviderType.SqlServer).ToString();
            //if (!Z.Dapper.Plus.DapperPlusManager.ValidateLicense(out licenseErrorMessage))
            //{
            //    throw new Exception(licenseErrorMessage);
            //}
            //// CHECK if the license is valid for a specific provider
            //if (!Z.Dapper.Plus.DapperPlusManager.ValidateLicense(out licenseErrorMessage, DapperProviderType.MySql))
            //{
            //    throw new Exception(licenseErrorMessage);
            //}
            //////////////////////////////////////////////////////////////////////////////////////////////////
            ////sql driver only
            //Z.EntityFramework.Extensions.LicenseManager.AddLicense("714;101-DUONGDUCDAT", "F16F035-6221C3E-352C831-FA3354E-2AB0");
            ////All driver all
            //Z.EntityFramework.Extensions.LicenseManager.AddLicense("261;100-DUONGDUCDAT", "5A7A301-2772174-EC722FD-558ECC6-11CD");
            //EFCoreConfig.AddLicense("306;100-DUONGDUCDAT", "5070301-2702152-A4025EE-EEEA46F-8689");
            //Z.EntityFramework.Extensions.EF6Config.AddLicense("476;900-DUONGDUCDAT", "B4B04B3-54D112F-2EB4949-3D42EFC-C5E2");
            ////string licenseErrorMessage;
            //if (!Z.EntityFramework.Extensions.EFCoreConfig.ValidateLicense(out licenseErrorMessage))
            //{
            //    throw new Exception(licenseErrorMessage);
            //}
            //// CHECK if the license is valid for a specific provider
            //if (!Z.EntityFramework.Extensions.EFCoreConfig.ValidateLicense(out licenseErrorMessage))
            //{
            //    throw new Exception(licenseErrorMessage);
            //}
            //Z.LinqToSql.Plus.LinqToSqlManager.AddLicense("721;800-DUONGDUCDAT", "C35C15B-5021663-09B6D17-2A20966-3B8B");
            ////string licenseErrorMessage;
            //if (!Z.LinqToSql.Plus.LinqToSqlManager.ValidateLicense(out licenseErrorMessage))
            //{
            //    throw new Exception(licenseErrorMessage);
            //}
            //////////////////////////////////////////////////////////////////////////////////////////////////
            //// CHECK for default provider (SQL Server)
            //Z.BulkOperations.LicenseManager.AddLicense("", "");
            //string licenseErrorMessage;
            //if (!Z.BulkOperations.LicenseManager.ValidateLicense(out licenseErrorMessage))
            //{
            //    throw new Exception(licenseErrorMessage);
            //}

            //// CHECK for a specific provider
            //if (!Z.BulkOperations.LicenseManager.ValidateLicense(out licenseErrorMessage, ProviderType.MySql))
            //{
            //    throw new Exception(licenseErrorMessage);
            //}
            //////////////////////////////////////////////////////////////////////////////////////////////////
            _appConfiguration = env.GetAppConfiguration();
            _hostingEnvironment = env;
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            //datdd
            _services = services;
            services.AddHttpContextAccessor();

            // MVC
            services.AddControllersWithViews(options =>
                {
                    options.Filters.Add(new AbpAutoValidateAntiforgeryTokenAttribute());
                })
#if DEBUG
                .AddRazorRuntimeCompilation()
#endif
                .AddNewtonsoftJson();
            if (bool.Parse(_appConfiguration["KestrelServer:IsEnabled"]))
            {
                ConfigureKestrel(services);
            }

            IdentityRegistrar.Register(services);

            //  datdd
            // cookie policy to deal with temporary browser incompatibilities
            services.AddSameSiteCookiePolicy();

            //services.ConfigureApplicationCookie(options =>
            //{
            //    options.Cookie.HttpOnly = true;
            //    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            //    //options.Cookie.Name = "MyCustomCookieName";
            //    options.Cookie.SameSite = SameSiteMode.None;
            //});

            //Identity server
            if (bool.Parse(_appConfiguration["IdentityServer:IsEnabled"]))
            {
                IdentityServerRegistrar.Register(services, _appConfiguration, options =>
                    options.UserInteraction = new UserInteractionOptions()
                    {
                        LoginUrl = "/Account/Login",
                        LogoutUrl = "/Account/LogOut",
                        ErrorUrl = "/Error"
                    });
            }

            AuthConfigurer.Configure(services, _appConfiguration);

            if (WebConsts.SwaggerUiEnabled)
            {
                //Swagger - Enable this line and the related lines in Configure method to enable swagger UI
                services.AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("v1", new OpenApiInfo() {Title = "AbpZeroTemplate API", Version = "v1"});
                    options.DocInclusionPredicate((docName, description) => true);
                    options.ParameterFilter<SwaggerEnumParameterFilter>();
                    options.SchemaFilter<SwaggerEnumSchemaFilter>();
                    options.OperationFilter<SwaggerOperationIdFilter>();
                    options.OperationFilter<SwaggerOperationFilter>();
                    options.CustomDefaultSchemaIdSelector();
                }).AddSwaggerGenNewtonsoftSupport();
            }

            //Recaptcha
            services.AddreCAPTCHAV3(x =>
            {
                x.SiteKey = _appConfiguration["Recaptcha:SiteKey"];
                x.SiteSecret = _appConfiguration["Recaptcha:SecretKey"];
            });

            if (WebConsts.HangfireDashboardEnabled)
            {
                //Hangfire (Enable to use Hangfire instead of default job manager)
                services.AddHangfire(config =>
                {
                    config.UseSqlServerStorage(_appConfiguration.GetConnectionString("Default"));
                });
            }

            services.AddScoped<IWebResourceManager, WebResourceManager>();

            services.AddSignalR();

            if (WebConsts.GraphQL.Enabled)
            {
                services.AddAndConfigureGraphQL();
            }

            services.Configure<SecurityStampValidatorOptions>(options =>
            {
                options.ValidationInterval = TimeSpan.Zero;
            });

            if (bool.Parse(_appConfiguration["HealthChecks:HealthChecksEnabled"]))
            {
                services.AddAbpZeroHealthCheck();

                var healthCheckUISection = _appConfiguration.GetSection("HealthChecks")?.GetSection("HealthChecksUI");

                if (bool.Parse(healthCheckUISection["HealthChecksUIEnabled"]))
                {
                    services.Configure<HealthChecksUISettings>(settings =>
                    {
                        healthCheckUISection.Bind(settings, c => c.BindNonPublicProperties = true);
                    });

                    services.AddHealthChecksUI()
                        .AddInMemoryStorage();
                }
            }

            services.Configure<RazorViewEngineOptions>(options =>
            {
                options.ViewLocationExpanders.Add(new RazorViewLocationExpander());
            });

            //Configure Abp and Dependency Injection
            return services.AddAbp<AbpZeroTemplateWebMvcModule>(options =>
            {
                //Configure Log4Net logging
                options.IocManager.IocContainer.AddFacility<LoggingFacility>(
                    f => f.UseAbpLog4Net().WithConfig(_hostingEnvironment.IsDevelopment()
                        ? "log4net.config"
                        : "log4net.Production.config")
                );

                options.PlugInSources.AddFolder(Path.Combine(_hostingEnvironment.WebRootPath, "Plugins"),
                    SearchOption.AllDirectories);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            //Initializes ABP framework.
            app.UseAbp(options =>
            {
                options.UseAbpRequestLocalization = false; //used below: UseAbpRequestLocalization
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseStatusCodePagesWithRedirects("~/Error?statusCode={0}");
                app.UseExceptionHandler("/Error");
            }

            //  datdd
            //app.UseHttpsRedirection();
            app.UseCookiePolicy();

            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();


            if (bool.Parse(_appConfiguration["Authentication:JwtBearer:IsEnabled"]))
            {
                app.UseJwtTokenMiddleware();
            }

            if (bool.Parse(_appConfiguration["IdentityServer:IsEnabled"]))
            {
                app.UseJwtTokenMiddleware("IdentityBearer");
                app.UseIdentityServer();
            }

            app.UseAuthorization();

            using (var scope = app.ApplicationServices.CreateScope())
            {
                if (scope.ServiceProvider.GetService<DatabaseCheckHelper>()
                    .Exist(_appConfiguration["ConnectionStrings:Default"]))
                {
                    app.UseAbpRequestLocalization();
                }
            }

            if (WebConsts.HangfireDashboardEnabled)
            {
                //Hangfire dashboard & server (Enable to use Hangfire instead of default job manager)
                app.UseHangfireDashboard("/hangfire", new DashboardOptions
                {
                    Authorization = new[]
                        {new AbpHangfireAuthorizationFilter(AppPermissions.Pages_Administration_HangfireDashboard)}
                });
                app.UseHangfireServer();
            }

            if (bool.Parse(_appConfiguration["Payment:Stripe:IsActive"]))
            {
                StripeConfiguration.ApiKey = _appConfiguration["Payment:Stripe:SecretKey"];
            }

            if (WebConsts.GraphQL.Enabled)
            {
                app.UseGraphQL<MainSchema>();
                if (WebConsts.GraphQL.PlaygroundEnabled)
                {
                    app.UseGraphQLPlayground(
                        new GraphQLPlaygroundOptions()); //to explorer API navigate https://*DOMAIN*/ui/playground
                }
            }

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<AbpCommonHub>("/signalr");
                endpoints.MapHub<ChatHub>("/signalr-chat");

                endpoints.MapControllerRoute("defaultWithArea", "{area}/{controller=Home}/{action=Index}/{id?}");
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");

                if (bool.Parse(_appConfiguration["HealthChecks:HealthChecksEnabled"]))
                {
                    endpoints.MapHealthChecks("/health", new HealthCheckOptions()
                    {
                        Predicate = _ => true,
                        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                    });
                }
                
                app.ApplicationServices.GetRequiredService<IAbpAspNetCoreConfiguration>().EndpointConfiguration.ConfigureAllEndpoints(endpoints);
            });

            if (bool.Parse(_appConfiguration["HealthChecks:HealthChecksEnabled"]))
            {
                if (bool.Parse(_appConfiguration["HealthChecks:HealthChecksUI:HealthChecksUIEnabled"]))
                {
                    app.UseHealthChecksUI();
                }
            }

            if (WebConsts.SwaggerUiEnabled)
            {
                // Enable middleware to serve generated Swagger as a JSON endpoint
                app.UseSwagger();
                //Enable middleware to serve swagger - ui assets(HTML, JS, CSS etc.)
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint(_appConfiguration["App:SwaggerEndPoint"], "AbpZeroTemplate API V1");
                    options.IndexStream = () => Assembly.GetExecutingAssembly()
                        .GetManifestResourceStream("MyCompanyName.AbpZeroTemplate.Web.wwwroot.swagger.ui.index.html");
                    options.InjectBaseUrl(_appConfiguration["App:WebSiteRootAddress"]);
                }); //URL: /swagger
            }

            //  datdd
            //app.Map("/allservice", app01 => {
            //    app01.Run(async (context) => {

            //        var stringBuilder = new StringBuilder();
            //        stringBuilder.Append("<tr><th>Tên</th><th>Lifetime</th><th>Tên đầy đủ</th></tr>");
            //        foreach (var service in _services)
            //        {
            //            string tr = service.ServiceType.Name.ToString().HtmlTag("td") +
            //            service.Lifetime.ToString().HtmlTag("td") +
            //            service.ServiceType.FullName.HtmlTag("td");
            //            stringBuilder.Append(tr.HtmlTag("tr"));
            //        }

            //        string htmlallservice = stringBuilder.ToString().HtmlTag("table", "table table-bordered table-sm");
            //        string html = HtmlHelper.HtmlDocument("Các dịch vụ", (htmlallservice));

            //        await context.Response.WriteAsync("TEST MAP");
            //    });
            //});
        }

        private void ConfigureKestrel(IServiceCollection services)
        {
            services.Configure<Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions>(options =>
            {
                //options.Listen(new System.Net.IPEndPoint(System.Net.IPAddress.Any, 443));
                //return;

                options.Listen(new System.Net.IPEndPoint(System.Net.IPAddress.Any, 443),
                listenOptions =>
                {
                    //  datdd
                    var certPassword = _appConfiguration.GetValue<string>("Kestrel:Certificates:Default:Password");
                    var certPath = _appConfiguration.GetValue<string>("Kestrel:Certificates:Default:Path");
                    //var cert = new System.Security.Cryptography.X509Certificates.X509Certificate2(certPath, certPassword);
                    //listenOptions.UseHttps(new HttpsConnectionAdapterOptions()
                    //{
                    //    ServerCertificate = cert
                    //});

                });
            });
        }
    }

    public static class HtmlHelper
    {
        /// <summary>
        /// Phát sinh trang HTML
        /// </summary>
        /// <param name="title">Tiêu đề trang</param>
        /// <param name="content">Nội dung trong thẻ body</param>
        /// <returns>Trang HTML</returns>
        public static string HtmlDocument(string title, string content)
        {
            return $@"
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset=""UTF-8"">
                            <title>{title}</title>
                            <link rel=""stylesheet"" href=""https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"" />
                            <script src=""https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"">
                            </script><script src=""https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js"">
                            </script><script src=""https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js""></script> 
                        </head>
                        <body>
                            {content}
                        </body>
                    </html>";
        }


        /// <summary>
        /// Phát sinh HTML thanh menu trên, menu nào  active phụ thuộc vào URL mà request gủi đến
        /// </summary>
        /// <param name="menus">Mảng các menu item, mỗi item có cấu trúc {url, lable}</param>
        /// <param name="request">HttpRequest</param>
        /// <returns></returns>

        public static string MenuTop(object[] menus, HttpRequest request)
        {

            var menubuilder = new StringBuilder();
            menubuilder.Append("<ul class=\"navbar-nav\">");
            foreach (dynamic menu in menus)
            {
                string _class = "nav-item";
                // Active khi request.PathBase giống url của menu
                if (request.Path == menu.url) _class += " active";
                menubuilder.Append($@"
                                <li class=""{_class}"">
                                    <a class=""nav-link"" href=""{menu.url}"">{menu.label}</a>
                                </li>
                                ");
            }
            menubuilder.Append("</ul>\n");

            string menuhtml = $@"
                    <div class=""container"">
                        <nav class=""navbar navbar-expand-lg navbar-dark mainbackground"">
                            <a class=""navbar-brand"" href=""/"">XTLAB</a>
                            <button class=""navbar-toggler"" type=""button""
                                data-toggle=""collapse"" data-target=""#my-nav-bar""
                                aria-controls=""my-nav-bar"" aria-expanded=""false"" aria-label=""Toggle navigation"">
                                <span class=""navbar-toggler-icon""></span>
                            </button>
                            <div class=""collapse navbar-collapse"" id=""my-nav-bar"">
                                {menubuilder}
                            </div>
                    </nav></div>";

            return menuhtml;
        }

        /// <summary>
        /// Những menu item mặc định cho trang
        /// </summary>
        /// <returns>Mảng các menuitem</returns>
        public static object[] DefaultMenuTopItems()
        {
            return new object[] {
              new {
                  url = "/RequestInfo",
                  label = "Request"
              },
              new {
                  url = "/Form",
                  label = "Form"
              }
              ,
              new {
                  url = "/Encoding",
                  label = "Encoding"
              },
              new {
                  url = "/Cookies",
                  label = "Cookies"
              },
              new {
                  url = "/Json",
                  label = "JSON"
              }
          };
        }

        public static string HtmlTrangchu()
        {
            return $@"
          <div class=""container"">
            <div class=""jumbotron"">
                <h1 class=""display-4"">Đây là một trang Web .NET Core</h1>
                <p class=""lead"">Trang Web này xây dựng trên nền tảng  <code>.NET Core</code>,
                chưa sử dụng kỹ thuật MVC - nhằm mục đích học tập.
                Mã nguồn trang này tại <a target=""_blank""
                    href=""https://github.com/xuanthulabnet/learn-cs-netcore/blob/master/ASP_NET_CORE/03.RequestResponse/"">
                    Mã nguồn Ví dụ</a>
                
                </p>
                <hr class=""my-4"">
                <p><code>.NET Core</code> là một hệ thống chạy đa nền tảng (Windows, Linux, macOS)</p>
                <a class=""btn btn-danger btn-lg"" href=""https://xuanthulab.net/lap-trinh-c-co-ban/"" role=""button"">Xem thêm</a>
            </div>
        </div>
         ";

        }

        // Mở rộng String, phát sinh thẻ HTML với nội dụng là String
        // Ví dụ: 
        // "content".HtmlTag() => <p>content</p>
        // "content".HtmlTag("div", "text-danger") => <div class="text-danger">content</div>
        public static string HtmlTag(this string content, string tag = "p", string _class = null)
        {
            string cls = (_class != null) ? $" class=\"{_class}\"" : null;
            return $"<{tag + cls}>{content}</{tag}>";
        }
        public static string td(this string content, string _class = null)
        {
            return content.HtmlTag("td", _class);
        }
        public static string tr(this string content, string _class = null)
        {
            return content.HtmlTag("tr", _class);
        }
        public static string table(this string content, string _class = null)
        {
            return content.HtmlTag("table", _class);
        }


    }
}
