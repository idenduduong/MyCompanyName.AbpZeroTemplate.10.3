using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace MyCompanyName.Web.Pages
{
    public class IndexModel : MyCompanyNamePageModel
    {
        public void OnGet()
        {
            
        }

        public async Task OnPostLoginAsync()
        {
            await HttpContext.ChallengeAsync("oidc");
        }
    }
}