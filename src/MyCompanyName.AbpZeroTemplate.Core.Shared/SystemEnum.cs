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
    }
}
