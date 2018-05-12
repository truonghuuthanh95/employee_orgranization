using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization
{
    public partial class Startup
    {
        public void Configuration(Owin.IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}