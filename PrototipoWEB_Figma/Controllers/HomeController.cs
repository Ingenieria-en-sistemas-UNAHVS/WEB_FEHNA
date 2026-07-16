using Microsoft.AspNetCore.Mvc;

namespace FEHNA.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
