using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Puppeteer.Models;

namespace Puppeteer.Controllers
{
    public class HomeController : Controller
    {
        private readonly INodeServices _nodeServices;

        public HomeController(INodeServices nodeServices)
        {
            _nodeServices = nodeServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(PdfModel model)
        {
            var stream = await _nodeServices.InvokeAsync<Stream>("./Node/pdf.js", model.Html);

            return File(stream, "application/pdf");
        }
    }
}