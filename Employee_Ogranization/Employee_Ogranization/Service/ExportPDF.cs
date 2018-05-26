using Employee_Ogranization.Models.DAO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using System.Threading.Tasks;
using System.Web;

namespace Employee_Ogranization.Service
{
    public class ExportPDF
    {
        public static Task GenerateCandidatePDF(int id)
        {
            return Task.Run(() =>
            {
                string oldFileName = string.Concat("hosoungtuyen.pdf");
                string newFileName = string.Concat(id + ".pdf");
                string oldFile = HttpContext.Current.Server.MapPath("~/Service/" + oldFileName);
                string newFile = HttpContext.Current.Server.MapPath("~/Service/PDF/" + newFileName);
                

                // open the reader
                PdfReader reader = new PdfReader(oldFile);
                Rectangle size = reader.GetPageSizeWithRotation(1);
                Document document = new Document(size);

                // open the writer
                FileStream fs = new FileStream(newFile, FileMode.Create, FileAccess.Write);
                PdfWriter writer = PdfWriter.GetInstance(document, fs);
                document.Open();

                // the pdf content
                PdfContentByte cb = writer.DirectContent;

                // select the font properties
                BaseFont bf = BaseFont.CreateFont(BaseFont.TIMES_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                cb.SetColorFill(BaseColor.DARK_GRAY);
                cb.SetFontAndSize(bf, 12);

                // write the text in the pdf content
                cb.BeginText();
                string text = "Some random blablablabla...";
                // put the alignment and coordinates here
                cb.ShowTextAligned(1, text, 300, 785, 0);
                cb.EndText();
                cb.BeginText();
                text = "Other random blabla...";
                // put the alignment and coordinates here
                cb.ShowTextAligned(2, text, 100, 200, 0);
                cb.EndText();

                // create the new page and add it to the pdf
                PdfImportedPage page = writer.GetImportedPage(reader, 1);
                cb.AddTemplate(page, 0, 0);

                // close the streams and voilá the file should be changed :)
                document.Close();
                fs.Close();
                writer.Close();
                reader.Close();
            });
        }
    }
}