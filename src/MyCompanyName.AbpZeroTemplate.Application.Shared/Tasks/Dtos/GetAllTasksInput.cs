using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.AppTasks.Dtos
{
    public class GetAllTasksInput
    {
        public TaskState? State { get; set; }
    }
}
