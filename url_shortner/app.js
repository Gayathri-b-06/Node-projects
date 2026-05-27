import { writeFile } from "fs/promises";
import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";

const serveFile = async (res, filepath, content_type) => {
  try {
    const data = await readFile(path.join("public", filepath));

    res.writeHead(200, {
      "Content-Type": content_type,
    });

    res.end(data);
  } catch (error) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("404 Page Not Found");
  }
};

const DATA_FILE=path.join("data","links.json");
const loadLinks=async()=>{
  try{
    const data=await readFile(DATA_FILE,"utf-8");
    return JSON.parse(data);
  }
  catch(error){
    if(error.code==="ENOENT"){
      await writeFile(DATA_FILE,JSON.stringify({}));
      return {};
    }
    throw error;
   
  }
}

const saveLinks=async(links)=>{
  await writeFile(DATA_FILE,JSON.stringify(links));
}

const server = createServer(async(req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, "index.html", "text/html");
    } else if (req.url === "/index.css") {
      return serveFile(res, "index.css", "text/css");
    }else if(req.url==="/links")
    {
      const links=await loadLinks();
       res.writeHead(200, {
          "Content-Type": "application/json",
        });

        return res.end(JSON.stringify(links));

    }
    else
    {
      const links=await loadLinks();
      const shortcode=req.url.slice(1);
      if(links[shortcode])
      {
        res.writeHead(302, {
          location: links[shortcode],
        });

        return res.end();
      }
      res.writeHead(404, {
          "Content-Type": "text/plain",
        });

        return res.end("shortend url Not Found");
    }
  }
  if (req.url === "/shorten" && req.method === "POST") {

    const links=await loadLinks();

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async() => {
      const { url, shortcode } = JSON.parse(body);
      if (!url) {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });

        return res.end("url Not Found");
      }

      const finalshortcode = shortcode || Math.random().toString(36).substring(2, 8);

      if(links[finalshortcode])
      {
           res.writeHead(404, {
          "Content-Type": "text/plain",
        });

        return res.end("short code already exists choose another one");
      }
      links[finalshortcode]=url;
      await saveLinks(links);
       res.writeHead(200, {
          "Content-Type": "application/json",
        });

        return res.end(JSON.stringify({success:true,shortcode:finalshortcode}));
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
