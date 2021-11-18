using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyMovie_Reactjs.Models
{
    public class Booked
    {
        public int BookedId { get; set; }
        public string MovieName {get;set;}
        public string Cinema {get;set;}
        public string ShowData { get; set; }
        public string ShowTime { get; set; }
        public string UserName {get;set;}
        public string UserEmail {get;set;}
    }
}