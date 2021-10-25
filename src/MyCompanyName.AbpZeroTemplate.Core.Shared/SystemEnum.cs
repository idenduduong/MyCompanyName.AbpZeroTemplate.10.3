using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate
{
    public class SystemEnum
    {

        public enum ToolType : byte
        {
            None                        = 0,
            DauDocMaVach1ChieuCoDay     = 1,
            DauDocMaVach1CheiuKhongDay  = 2,
            MayInLaser                  = 3,
            MayInNhiet                  = 4,
            MayInPhotocopy              = 5,
            MayTinhDeBan                = 6,
            MayTinhXachTay              = 7,
            MoDem                       = 8,
            Switch                      = 9,
            Khac                        = 100
        }

        public enum ToolCondition : byte
        {
            None = 0,
            TrucTrac = 1,
            KhongOnDinh = 2,
            Cham = 3,
            BinhThuong = 4,
            Tot = 5,
            Khac = 100
        }

        public enum ToolStatus : byte
        {
            None = 0,
            DangSuDung = 1,
            DaDungSuDung = 2,
            YeuCauSuaChua = 3,
            YeuCauThayThe = 4,
            YeuCauDieuChuyen = 5,
            KhongCoNhuCauSuDung = 6,
            Khac = 100
        }
    }
}