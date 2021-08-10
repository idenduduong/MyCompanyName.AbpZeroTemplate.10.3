using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1;
using MyCompanyName.AbpZeroTemplate.Products;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs;
//using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs;
using MyCompanyName.AbpZeroTemplate.Phones;
using Abp.IdentityServer4vNext;
using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Authorization.Delegation;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.Chat;
using MyCompanyName.AbpZeroTemplate.Editions;
using MyCompanyName.AbpZeroTemplate.Friendships;
using MyCompanyName.AbpZeroTemplate.MultiTenancy;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Accounting;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Payments;
using MyCompanyName.AbpZeroTemplate.Storage;
using MyCompanyName.AbpZeroTemplate.Persons;
using System;
using Abp.Runtime.Session;
using System.Linq;
using Abp.Organizations;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Metadata;
using MyCompanyName.AbpZeroTemplate.AppTasks;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Temp;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Accounting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs;
using MyCompanyName.AbpZeroTemplate.crmdemo.OrganizationUnits;

namespace MyCompanyName.AbpZeroTemplate.EntityFrameworkCore
{
    public class AbpZeroTemplateDbContext : AbpZeroDbContext<Tenant, Role, User, AbpZeroTemplateDbContext>, IAbpPersistedGrantDbContext
    {
        //  crmdemo
        //public virtual DbSet<Release> Releases { get; set; }

        //public virtual DbSet<RoleProcessStatus> RoleProcessStatuses { get; set; }

        //public virtual DbSet<RecallDataLog> RecallDataLogs { get; set; }

        //public virtual DbSet<DueDateRenew> DueDateRenews { get; set; }

        //public virtual DbSet<AssigneBulkleDataLog> AssigneBulkleDataLogs { get; set; }

        //public virtual DbSet<AssignDataLog> AssignDataLogs { get; set; }

        //public virtual DbSet<DataChangeStatusLog> DataChangeStatusLogs { get; set; }

        //public virtual DbSet<PhoneLog> PhoneLogs { get; set; }

        //public virtual DbSet<CustomerDataRaw> CustomerDataRaws { get; set; }

        //public virtual DbSet<CustomerData> CustomerDatas { get; set; }

        //public virtual DbSet<ChangeStatusFlow> ChangeStatusFlows { get; set; }

        //public virtual DbSet<Reason> Reasons { get; set; }

        //public virtual DbSet<DataProcessStatus> DataProcessStatuses { get; set; }

        //public virtual DbSet<DataSource> DataSources { get; set; }

        //public virtual DbSet<ImportData> ImportDatas { get; set; }

        //public virtual DbSet<ReportData> ReportDatas { get; set; }

        //public virtual DbSet<PackageRelease> PackageReleases { get; set; }

        //public virtual DbSet<BalanceRelease> BalanceReleases { get; set; }

        //public virtual DbSet<Schedule> Schedules { get; set; }

        //public virtual DbSet<SatisfactionLevel> SatisfactionLevels { get; set; }

        public virtual DbSet<Voucher> Vouchers { get; set; }

        //public virtual DbSet<DM_NgheNghiep> DM_NgheNghieps { get; set; }

        //public virtual DbSet<QuanLyKhieuNai> QuanLyKhieuNais { get; set; }

        //public virtual DbSet<HappyCall> HappyCalls { get; set; }

        public virtual DbSet<EntityOrder> EntityOrders { get; set; }

        public virtual DbSet<DM_KhuyenMai> DM_KhuyenMais { get; set; }

        //public virtual DbSet<DichVuCongDoan> DichVuCongDoans { get; set; }

        //public virtual DbSet<CongDoan> CongDoans { get; set; }

        //public virtual DbSet<NhanVienTuVan> NhanVienTuVans { get; set; }

        public virtual DbSet<NhanVienThucHien> NhanVienThucHiens { get; set; }

        public virtual DbSet<NhatKySuDungThe> NhatKySuDungThes { get; set; }

        //public virtual DbSet<HoaDonBanLe_DacDiemKhachHang> HoaDonBanLe_DacDiemKhachHangs { get; set; }

        public virtual DbSet<HoaDonBanLeChiTiet> HoaDonBanLeChiTiets { get; set; }

        public virtual DbSet<HoaDonBanLe> HoaDonBanLes { get; set; }

        //public virtual DbSet<TuVanKhachHang> TuVanKhachHangs { get; set; }

        //public virtual DbSet<TheKhachHang_DonViSuDung> TheKhachHang_DonViSuDungs { get; set; }

        public virtual DbSet<TheKhachHangChiTiet> TheKhachHangChiTiets { get; set; }

        public virtual DbSet<DM_LienHe> DM_LienHes { get; set; }

        public virtual DbSet<TheKhachHang> TheKhachHangs { get; set; }

        //public virtual DbSet<KhoanThuChi_ChiPhiDoanhThu> KhoanThuChi_ChiPhiDoanhThus { get; set; }

        //public virtual DbSet<KhoanChiPhi_DoanhThu> KhoanChiPhi_DoanhThus { get; set; }

        //public virtual DbSet<KhoanThuChi> KhoanThuChis { get; set; }

        //public virtual DbSet<MaChungTu> MaChungTus { get; set; }

        //public virtual DbSet<DoiTuong_DacDiem> DoiTuong_DacDiems { get; set; }

        public virtual DbSet<DM_DacDiemKhachHang> DM_DacDiemKhachHangs { get; set; }

        //public virtual DbSet<DM_LoaiChungTu> DM_LoaiChungTus { get; set; }

        public virtual DbSet<PhieuThuChiTiet> PhieuThuChiTiets { get; set; }

        //public virtual DbSet<PhieuThu> PhieuThus { get; set; }

        //public virtual DbSet<CongDoan_DichVu> CongDoan_DichVus { get; set; }

        //public virtual DbSet<DonViQuiDoi> DonViQuiDois { get; set; }

        //public virtual DbSet<ViTriHangTrongKho> ViTriHangTrongKhos { get; set; }

        //public virtual DbSet<TonToiThieu> TonToiThieus { get; set; }

        //public virtual DbSet<ChietKhauMacDinh_NhanVien> ChietKhauMacDinh_NhanViens { get; set; }

        //public virtual DbSet<DM_LoHang> DM_LoHangs { get; set; }

        public virtual DbSet<DM_HangHoa> DM_HangHoas { get; set; }

        public virtual DbSet<crmdemo.Categories.DM_DoiTuong> DM_DoiTuongs { get; set; }

        //public virtual DbSet<NhomHangHoa_DonVi> NhomHangHoa_DonVis { get; set; }

        //public virtual DbSet<Kho_DonVi> Kho_DonVis { get; set; }

        //public virtual DbSet<Position> Positions { get; set; }

        public virtual DbSet<CustomOrganizationUnit> CustomOrganizationUnits { get; set; }

        //public virtual DbSet<DM_ViTri> DM_ViTris { get; set; }

        //public virtual DbSet<NguonKhachHang> NguonKhachHangs { get; set; }

        //public virtual DbSet<DM_TyGia> DM_TyGias { get; set; }

        //public virtual DbSet<DM_TrangThai> DM_TrangThais { get; set; }

        public virtual DbSet<DM_TienTe> DM_TienTes { get; set; }

        //public virtual DbSet<DM_ThueSuat> DM_ThueSuats { get; set; }

        //public virtual DbSet<DM_QuanHuyen> DM_QuanHuyens { get; set; }

        //public virtual DbSet<DM_PhanLoaiHangHoaDichVu> DM_PhanLoaiHangHoaDichVus { get; set; }

        public virtual DbSet<DM_NhomThe> DM_NhomThes { get; set; }

        //public virtual DbSet<DM_NhomHangHoa> DM_NhomHangHoas { get; set; }

        public virtual DbSet<DM_NhomDoiTuong> DM_NhomDoiTuongs { get; set; }

        //public virtual DbSet<DM_Kho> DM_Khos { get; set; }

        //public virtual DbSet<DM_HinhThucVanChuyen> DM_HinhThucVanChuyens { get; set; }

        //public virtual DbSet<DM_DonViTinh> DM_DonViTinhs { get; set; }

        //public virtual DbSet<DM_DonVi> DM_DonVis { get; set; }

        //public virtual DbSet<DM_TinhThanh> DM_TinhThanhs { get; set; }

        //public virtual DbSet<DM_VungMien> DM_VungMiens { get; set; }

        //public virtual DbSet<DM_KhuVuc> DM_KhuVucs { get; set; }

        //public virtual DbSet<DM_LoaiPhong> DM_LoaiPhongs { get; set; }

        //public virtual DbSet<DM_QuocGia> DM_QuocGias { get; set; }

        //public virtual DbSet<DM_NganHang> DM_NganHangs { get; set; }
        
        //  exist
        
        ////public virtual DbSet<BinaryObject> BinaryObjects { get; set; }

        ////public virtual DbSet<Friendship> Friendships { get; set; }

        ////public virtual DbSet<ChatMessage> ChatMessages { get; set; }

        ////public virtual DbSet<SubscribableEdition> SubscribableEditions { get; set; }

        ////public virtual DbSet<SubscriptionPayment> SubscriptionPayments { get; set; }

        ////public virtual DbSet<Invoice> Invoices { get; set; }

        ////public virtual DbSet<PersistedGrantEntity> PersistedGrants { get; set; }
        /// ///////////////////////////////////////////////////////////////////////

        //  datdd
        public IPrincipalAccessor PrincipalAccessor { get; set; }

        protected virtual int? CurrentOUId => GetCurrentUsersOuIdOrNull();

        protected virtual bool IsOUFilterEnabled => CurrentUnitOfWorkProvider?.Current?.IsFilterEnabled("MayHaveOrganizationUnit") == true;

        protected override bool ShouldFilterEntity<TEntity>(IMutableEntityType entityType)
        {
            if (typeof(IMayHaveOrganizationUnit).IsAssignableFrom(typeof(TEntity)))
            {
                return true;
            }
            return base.ShouldFilterEntity<TEntity>(entityType);
        }

        protected override Expression<Func<TEntity, bool>> CreateFilterExpression<TEntity>()
        {
            var expression = base.CreateFilterExpression<TEntity>();
            if (typeof(IMayHaveOrganizationUnit).IsAssignableFrom(typeof(TEntity)))
            {
                Expression<Func<TEntity, bool>> mayHaveOUFilter = e => ((IMayHaveOrganizationUnit)e).OrganizationUnitId == CurrentOUId || (((IMayHaveOrganizationUnit)e).OrganizationUnitId == CurrentOUId) == IsOUFilterEnabled;
                expression = expression == null ? mayHaveOUFilter : CombineExpressions(expression, mayHaveOUFilter);
            }

            return expression;
        }

        protected virtual int? GetCurrentUsersOuIdOrNull()
        {
            var userOuClaim = PrincipalAccessor.Principal?.Claims.FirstOrDefault(c => c.Type == "Application_OrganizationUnitId");
            if (string.IsNullOrEmpty(userOuClaim?.Value))
            {
                return null;
            }

            return Convert.ToInt32(userOuClaim.Value);
        }
        /// ///////////////////////////////////////////////////////////

        public DbSet<AppTask> Tasks { get; set; }

        public virtual DbSet<Person> Persons { get; set; }

        public virtual DbSet<BaseEntity> BaseEntities { get; set; }

        public virtual DbSet<Child> Childs { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<DM_DoiTuong> DM_DoiTuong { get; set; }

        //public virtual DbSet<MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.DM_NhomDoiTuongs> DM_NhomDoiTuongs { get; set; }

        public virtual DbSet<Phone> Phones { get; set; }

        /* Define an IDbSet for each entity of the application */

        public virtual DbSet<BinaryObject> BinaryObjects { get; set; }

        public virtual DbSet<Friendship> Friendships { get; set; }

        public virtual DbSet<ChatMessage> ChatMessages { get; set; }

        public virtual DbSet<SubscribableEdition> SubscribableEditions { get; set; }

        public virtual DbSet<SubscriptionPayment> SubscriptionPayments { get; set; }

        public virtual DbSet<Invoice> Invoices { get; set; }

        public virtual DbSet<PersistedGrantEntity> PersistedGrants { get; set; }

        public virtual DbSet<SubscriptionPaymentExtensionData> SubscriptionPaymentExtensionDatas { get; set; }

        public virtual DbSet<UserDelegation> UserDelegations { get; set; }

        public AbpZeroTemplateDbContext(DbContextOptions<AbpZeroTemplateDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Child>(c =>
            {
                c.HasIndex(e => new { e.TenantId });
            });
            modelBuilder.Entity<BaseEntity>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Child>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BaseEntity>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Child>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BaseEntity>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Child>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BaseEntity>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Child>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BaseEntity>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Product>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Child>(c =>
                       {
                           c.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<Product>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<DM_DoiTuong>(d =>
                       {
                           d.HasIndex(e => new { e.TenantId });
                       });
            //modelBuilder.Entity<DM_NhomDoiTuongs>(d =>
            //           {
            //               d.HasIndex(e => new { e.TenantId });
            //           });
            modelBuilder.Entity<Phone>(p =>
                       {
                           p.HasIndex(e => new { e.TenantId });
                       });
            modelBuilder.Entity<BinaryObject>(b =>
                       {
                           b.HasIndex(e => new { e.TenantId });
                       });

            modelBuilder.Entity<ChatMessage>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId, e.ReadState });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.UserId, e.ReadState });
            });

            modelBuilder.Entity<Friendship>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId });
                b.HasIndex(e => new { e.TenantId, e.FriendUserId });
                b.HasIndex(e => new { e.FriendTenantId, e.UserId });
                b.HasIndex(e => new { e.FriendTenantId, e.FriendUserId });
            });

            modelBuilder.Entity<Tenant>(b =>
            {
                b.HasIndex(e => new { e.SubscriptionEndDateUtc });
                b.HasIndex(e => new { e.CreationTime });
            });

            modelBuilder.Entity<SubscriptionPayment>(b =>
            {
                b.HasIndex(e => new { e.Status, e.CreationTime });
                b.HasIndex(e => new { PaymentId = e.ExternalPaymentId, e.Gateway });
            });

            modelBuilder.Entity<SubscriptionPaymentExtensionData>(b =>
            {
                b.HasQueryFilter(m => !m.IsDeleted)
                    .HasIndex(e => new { e.SubscriptionPaymentId, e.Key, e.IsDeleted })
                    .IsUnique();
            });

            modelBuilder.Entity<UserDelegation>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.SourceUserId });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId });
            });

            modelBuilder.ConfigurePersistedGrantEntity();
        }
    }
}