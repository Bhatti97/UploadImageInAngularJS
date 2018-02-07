using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace UploadImageInAngularJS.Models
{
    public class UploadFile
    {
        [Key]
        public int UploadFile_id { get; set; }

        public string FileName { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public int File { get; set; }
    }
}