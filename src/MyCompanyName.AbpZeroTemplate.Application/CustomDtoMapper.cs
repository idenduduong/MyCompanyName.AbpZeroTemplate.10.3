﻿using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1;
using MyCompanyName.AbpZeroTemplate.Products.Dtos;
using MyCompanyName.AbpZeroTemplate.Products;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs;
using MyCompanyName.AbpZeroTemplate.Phones.Dtos;
using MyCompanyName.AbpZeroTemplate.Phones;
using Abp.Application.Editions;
using Abp.Application.Features;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.DynamicEntityProperties;
using Abp.EntityHistory;
using Abp.Localization;
using Abp.Notifications;
using Abp.Organizations;
using Abp.UI.Inputs;
using Abp.Webhooks;
using AutoMapper;
using IdentityServer4.Extensions;
using MyCompanyName.AbpZeroTemplate.Auditing.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Accounts.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Delegation;
using MyCompanyName.AbpZeroTemplate.Authorization.Permissions.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Delegation.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Importing.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Profile.Dto;
using MyCompanyName.AbpZeroTemplate.Chat;
using MyCompanyName.AbpZeroTemplate.Chat.Dto;
using MyCompanyName.AbpZeroTemplate.DynamicEntityProperties.Dto;
using MyCompanyName.AbpZeroTemplate.Editions;
using MyCompanyName.AbpZeroTemplate.Editions.Dto;
using MyCompanyName.AbpZeroTemplate.Friendships;
using MyCompanyName.AbpZeroTemplate.Friendships.Cache;
using MyCompanyName.AbpZeroTemplate.Friendships.Dto;
using MyCompanyName.AbpZeroTemplate.Localization.Dto;
using MyCompanyName.AbpZeroTemplate.MultiTenancy;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Dto;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.HostDashboard.Dto;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Payments;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Payments.Dto;
using MyCompanyName.AbpZeroTemplate.Notifications.Dto;
using MyCompanyName.AbpZeroTemplate.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.Sessions.Dto;
using MyCompanyName.AbpZeroTemplate.WebHooks.Dto;
using MyCompanyName.AbpZeroTemplate.Persons.Dtos;
using MyCompanyName.AbpZeroTemplate.Persons;
using MyCompanyName.AbpZeroTemplate.AppTasks.Dtos;
using MyCompanyName.AbpZeroTemplate.AppTasks;

namespace MyCompanyName.AbpZeroTemplate
{
    internal static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //  datdd
            configuration.CreateMap<GetAllTasksInput, AppTask>().ReverseMap();
            configuration.CreateMap<TaskListDto, AppTask>().ReverseMap();

            configuration.CreateMap<EditPersonInput, Person>().ReverseMap();
            configuration.CreateMap<CreatePersonInput, Person>().ReverseMap();
            configuration.CreateMap<PersonListDto, Person>().ReverseMap();
            configuration.CreateMap<CreateOrEditBaseEntityDto, BaseEntity>().ReverseMap();
            configuration.CreateMap<BaseEntityDto, BaseEntity>().ReverseMap();
            configuration.CreateMap<CreateOrEditChildDto, Child>().ReverseMap();
            configuration.CreateMap<ChildDto, Child>().ReverseMap();
            configuration.CreateMap<CreateOrEditProductDto, Product>().ReverseMap();
            configuration.CreateMap<ProductDto, Product>().ReverseMap();
            configuration.CreateMap<CreateOrEditDM_DoiTuongDto, DM_DoiTuong>().ReverseMap();
            configuration.CreateMap<DM_DoiTuongDto, DM_DoiTuong>().ReverseMap();
            configuration.CreateMap<CreateOrEditDM_NhomDoiTuongsDto, MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.DM_NhomDoiTuongs>().ReverseMap();
            configuration.CreateMap<DM_NhomDoiTuongsDto, MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.DM_NhomDoiTuongs>().ReverseMap();
            configuration.CreateMap<CreateOrEditPhoneDto, Phone>().ReverseMap();
            configuration.CreateMap<PhoneDto, Phone>().ReverseMap();
            //Inputs
            configuration.CreateMap<CheckboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<SingleLineStringInputType, FeatureInputTypeDto>();
            configuration.CreateMap<ComboboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<IInputType, FeatureInputTypeDto>()
                .Include<CheckboxInputType, FeatureInputTypeDto>()
                .Include<SingleLineStringInputType, FeatureInputTypeDto>()
                .Include<ComboboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            configuration.CreateMap<ILocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>()
                .Include<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            configuration.CreateMap<LocalizableComboboxItem, LocalizableComboboxItemDto>();
            configuration.CreateMap<ILocalizableComboboxItem, LocalizableComboboxItemDto>()
                .Include<LocalizableComboboxItem, LocalizableComboboxItemDto>();

            //Chat
            configuration.CreateMap<ChatMessage, ChatMessageDto>();
            configuration.CreateMap<ChatMessage, ChatMessageExportDto>();

            //Feature
            configuration.CreateMap<FlatFeatureSelectDto, Feature>().ReverseMap();
            configuration.CreateMap<Feature, FlatFeatureDto>();

            //Role
            configuration.CreateMap<RoleEditDto, Role>().ReverseMap();
            configuration.CreateMap<Role, RoleListDto>();
            configuration.CreateMap<UserRole, UserListRoleDto>();

            //Edition
            configuration.CreateMap<EditionEditDto, SubscribableEdition>().ReverseMap();
            configuration.CreateMap<EditionCreateDto, SubscribableEdition>();
            configuration.CreateMap<EditionSelectDto, SubscribableEdition>().ReverseMap();
            configuration.CreateMap<SubscribableEdition, EditionInfoDto>();

            configuration.CreateMap<Edition, EditionInfoDto>().Include<SubscribableEdition, EditionInfoDto>();

            configuration.CreateMap<SubscribableEdition, EditionListDto>();
            configuration.CreateMap<Edition, EditionEditDto>();
            configuration.CreateMap<Edition, SubscribableEdition>();
            configuration.CreateMap<Edition, EditionSelectDto>();

            //Payment
            configuration.CreateMap<SubscriptionPaymentDto, SubscriptionPayment>().ReverseMap();
            configuration.CreateMap<SubscriptionPaymentListDto, SubscriptionPayment>().ReverseMap();
            configuration.CreateMap<SubscriptionPayment, SubscriptionPaymentInfoDto>();

            //Permission
            configuration.CreateMap<Permission, FlatPermissionDto>();
            configuration.CreateMap<Permission, FlatPermissionWithLevelDto>();

            //Language
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>();
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageListDto>();
            configuration.CreateMap<NotificationDefinition, NotificationSubscriptionWithDisplayNameDto>();
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>()
                .ForMember(ldto => ldto.IsEnabled, options => options.MapFrom(l => !l.IsDisabled));

            //Tenant
            configuration.CreateMap<Tenant, RecentTenant>();
            configuration.CreateMap<Tenant, TenantLoginInfoDto>();
            configuration.CreateMap<Tenant, TenantListDto>();
            configuration.CreateMap<TenantEditDto, Tenant>().ReverseMap();
            configuration.CreateMap<CurrentTenantInfoDto, Tenant>().ReverseMap();

            //User
            configuration.CreateMap<User, UserEditDto>()
                .ForMember(dto => dto.Password, options => options.Ignore())
                .ReverseMap()
                .ForMember(user => user.Password, options => options.Ignore());
            configuration.CreateMap<User, UserLoginInfoDto>();
            configuration.CreateMap<User, UserListDto>();
            configuration.CreateMap<User, ChatUserDto>();
            configuration.CreateMap<User, OrganizationUnitUserListDto>();
            configuration.CreateMap<Role, OrganizationUnitRoleListDto>();
            configuration.CreateMap<CurrentUserProfileEditDto, User>().ReverseMap();
            configuration.CreateMap<UserLoginAttemptDto, UserLoginAttempt>().ReverseMap();
            configuration.CreateMap<ImportUserDto, User>();

            //AuditLog
            configuration.CreateMap<AuditLog, AuditLogListDto>();
            configuration.CreateMap<EntityChange, EntityChangeListDto>();
            configuration.CreateMap<EntityPropertyChange, EntityPropertyChangeDto>();

            //Friendship
            configuration.CreateMap<Friendship, FriendDto>();
            configuration.CreateMap<FriendCacheItem, FriendDto>();

            //OrganizationUnit
            configuration.CreateMap<OrganizationUnit, OrganizationUnitDto>();

            //Webhooks
            configuration.CreateMap<WebhookSubscription, GetAllSubscriptionsOutput>();
            configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOutput>()
                .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.WebhookName,
                    options => options.MapFrom(l => l.WebhookEvent.WebhookName))
                .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.Data,
                    options => options.MapFrom(l => l.WebhookEvent.Data));

            configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOfWebhookEventOutput>();

            configuration.CreateMap<DynamicProperty, DynamicPropertyDto>().ReverseMap();
            configuration.CreateMap<DynamicPropertyValue, DynamicPropertyValueDto>().ReverseMap();
            configuration.CreateMap<DynamicEntityProperty, DynamicEntityPropertyDto>()
                .ForMember(dto => dto.DynamicPropertyName,
                    options => options.MapFrom(entity => entity.DynamicProperty.DisplayName.IsNullOrEmpty() ? entity.DynamicProperty.PropertyName : entity.DynamicProperty.DisplayName));
            configuration.CreateMap<DynamicEntityPropertyDto, DynamicEntityProperty>();

            configuration.CreateMap<DynamicEntityPropertyValue, DynamicEntityPropertyValueDto>().ReverseMap();

            //User Delegations
            configuration.CreateMap<CreateUserDelegationDto, UserDelegation>();

            /* ADD YOUR OWN CUSTOM AUTOMAPPER MAPPINGS HERE */
        }
    }
}