addEventListener(
  "fetch",event => {
     let url=new URL(event.request.url);
     url.hostname="public-upload.1070892255.workers.dev";
     let request=new Request(url,event.request);
     event. respondWith(
       fetch(request)
     )
  }
)