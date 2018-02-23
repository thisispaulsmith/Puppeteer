using System.ComponentModel.DataAnnotations;

namespace Puppeteer.Models
{
    public class PdfModel
    {
        [Required]
        public string Html { get; set; }
    }
}
