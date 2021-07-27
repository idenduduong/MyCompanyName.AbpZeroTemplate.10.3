using Abp.Organizations;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.Auditing;
using Abp.Timing;
using MyCompanyName.AbpZeroTemplate.Persons;

namespace MyCompanyName.AbpZeroTemplate.AppTasks
{
    [Table("AppTasks")]
    public class AppTask : Entity<int>, IHasCreationTime
    {
        public const int MaxTitleLength = 256;
        public const int MaxDescriptionLength = 64 * 1024; //64KB

        [Required]
        [StringLength(MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public DateTime CreationTime { get; set; }

        public TaskState State { get; set; }

        public AppTask()
        {
            CreationTime = Clock.Now;
            State = TaskState.Open;
        }

        [ForeignKey(nameof(AssignedPersonId))]
        public Person AssignedPerson { get; set; }
        
        public int? AssignedPersonId { get; set; }

        public AppTask(string title, string description = null, int? assignedPersonId = null)
            : this()
        {
            Title = title;
            Description = description;
            AssignedPersonId = assignedPersonId;
        }
    }
}