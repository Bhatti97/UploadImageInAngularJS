using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(UploadImageInAngularJS.Startup))]
namespace UploadImageInAngularJS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
