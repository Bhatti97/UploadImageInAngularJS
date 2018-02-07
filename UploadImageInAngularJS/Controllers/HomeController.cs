using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UploadImageInAngularJS.Models;

namespace UploadImageInAngularJS.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult UploadImage()
        {
            return View();
        }
        public JsonResult SaveImage(string description)
        {
            string message, filename, actualfilename;
            message = filename = actualfilename = string.Empty;
            bool flag = false;
            if(Request.Files!=null)
            {
                var file = Request.Files[0];
                actualfilename = file.FileName;
                filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;
                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadFiles"),filename));
                    UploadFile f = new UploadFile
                    {
                        FileName = actualfilename,
                        FilePath = filename,
                        Description = description,
                        File = size
                    };
                    db.UploadFile.Add(f);
                    db.SaveChanges();
                    flag = true;
                    message = "Upload File Successfully";
                }
                catch (Exception)
                {
                    message = "Upload File Successfully";
                }
            }
            return new JsonResult { Data = new { message = message ,status=flag} };
        }
    }
}