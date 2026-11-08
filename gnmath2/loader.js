
(async () => {
  const base = new URL("./", document.currentScript.src);
  const htmlURL = new URL("index.html", base);

  try {
    const response = await fetch(htmlURL);

    if (!response.ok) {
      throw new Error("index.html not found");
    }

    const html = await response.text();

    const frame = document.createElement("iframe");

    frame.style.cssText =
      "position:fixed;inset:0;width:100%;height:100%;border:0;";

    document.body.replaceChildren(frame);

    frame.srcdoc = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${base.href}">`
    );

  } catch (error) {
    document.body.textContent = "Loading failed: " + error.message;
  }
})();
