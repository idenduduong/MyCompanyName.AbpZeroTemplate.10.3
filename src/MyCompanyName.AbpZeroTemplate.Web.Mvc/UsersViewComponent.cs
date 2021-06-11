using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web
{
    public class UsersViewComponent : ViewComponent
    {
        private IUserService _userService;
        public UsersViewComponent(IUserService userService)
        {
            _userService = userService;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var users = await _userService.GetUsersAsync();
            return View(users);
        }
    }
}
