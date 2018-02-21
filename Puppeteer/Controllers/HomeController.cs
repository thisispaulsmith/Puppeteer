using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;

namespace Puppeteer.Controllers
{
    public class HomeController : Controller
    {
        private readonly INodeServices _nodeServices;

        public HomeController(INodeServices nodeServices)
        {
            _nodeServices = nodeServices;
        }

        public async Task<IActionResult> Index()
        {
            var result = await _nodeServices.InvokeAsync<string>("./Node/pdf.js", "<h1>title</h1>");
            return Content(result) ;
        }
    }
}