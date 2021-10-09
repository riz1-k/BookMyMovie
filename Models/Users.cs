using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyMovie_Reactjs.Models
{
    public class Users
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail{get;set;}
        public string UserPassword{get;set;}
    }
}