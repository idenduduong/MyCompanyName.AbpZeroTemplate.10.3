using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.AppTasks;

namespace MyCompanyName.AbpZeroTemplate.AppTasks
{
    //[AutoMapFrom(typeof(AppTask))]
    public class TaskListDto : EntityDto, IHasCreationTime
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreationTime { get; set; }

        public TaskState State { get; set; }

        public string AssignedPersonName { get; set; }
    }
}
