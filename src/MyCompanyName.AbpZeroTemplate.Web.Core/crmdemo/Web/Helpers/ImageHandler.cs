// crmdemo.Web.Helpers.ImageHandler
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.Web.crmdemo.Helpers
{
	public class ImageHandler
	{
		public void Save(Bitmap image, int maxWidth, int maxHeight, int quality, string filePath)
		{
			int originalWidth = image.Width;
			int originalHeight = image.Height;
			float val = (float)maxWidth / (float)originalWidth;
			float ratioY = (float)maxHeight / (float)originalHeight;
			float ratio = Math.Min(val, ratioY);
			int newWidth = (int)((float)originalWidth * ratio);
			int newHeight = (int)((float)originalHeight * ratio);
			Bitmap newImage = new Bitmap(newWidth, newHeight, PixelFormat.Format24bppRgb);
			using (Graphics graphics = Graphics.FromImage(newImage))
			{
				graphics.CompositingQuality = CompositingQuality.HighQuality;
				graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
				graphics.SmoothingMode = SmoothingMode.HighQuality;
				graphics.DrawImage(image, 0, 0, newWidth, newHeight);
			}
			ImageCodecInfo imageCodecInfo = GetEncoderInfo(ImageFormat.Jpeg);
			Encoder quality2 = Encoder.Quality;
			EncoderParameters encoderParameters = new EncoderParameters(1);
			EncoderParameter encoderParameter = new EncoderParameter(quality2, quality);
			encoderParameters.Param[0] = encoderParameter;
			newImage.Save(filePath, imageCodecInfo, encoderParameters);
		}

		private ImageCodecInfo GetEncoderInfo(ImageFormat format)
		{
			return ImageCodecInfo.GetImageDecoders().SingleOrDefault((ImageCodecInfo c) => c.FormatID == format.Guid);
		}

		public static Bitmap LoadImage(string path)
		{
			MemoryStream memoryStream = new MemoryStream(File.ReadAllBytes(path));
			GC.KeepAlive(memoryStream);
			return (Bitmap)Image.FromStream(memoryStream);
		}

		public static Size GetThumbnailSize(Image original)
		{
			int originalWidth = original.Width;
			int originalHeight = original.Height;
			double factor = ((originalWidth <= originalHeight) ? (40.0 / (double)originalHeight) : (40.0 / (double)originalWidth));
			return new Size((int)((double)originalWidth * factor), (int)((double)originalHeight * factor));
		}
	}
}
