using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net;
using System.Text;

namespace CheckEmail
{
    public static class CheckEmail
    {
        [FunctionName("CheckEmail")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)

        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            // Convert all request param into Json object

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);


            // Extract each param
            string email = Convert.ToString(data.email);

            if (email == null)
            {
                return new JsonResult("Please pass an email in the request body");
            }
            else
            {
                string baseUrl = "http://apilayer.net/api/check?access_key=89bd6a07403dca81504575175b73a83b";

                // Call Your  API
                HttpClient httpClient = new HttpClient();
                var response = await httpClient.GetAsync(string.Format(baseUrl + "&email={0}", email));

                if (!response.IsSuccessStatusCode)
                {
                    return new JsonResult(response.StatusCode.ToString());
                }

                string res = await response.Content.ReadAsStringAsync();
                dynamic content = JsonConvert.DeserializeObject<object>(res);
                decimal score = Convert.ToDecimal(content.score);
                string isValid = Convert.ToString(content.format_valid);
              
                //Send api response
                return new JsonResult(content);
            }
        }

    }

}
