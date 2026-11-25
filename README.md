# H&S Services  /  Website

Single-page site for H&S Services, an H&S Group company. Prepared by revmedia.

## November 2026 build (new site)

Built on the **H&S Group design system** so it matches the other group websites
(H&S Group, H&S Construction, Purus, BlueSky): fixed navy nav, full-bleed photo hero with stat strip,
the moving "belt", photo service cards, process steps, client logo wall, careers, FAQ, navy contact block
with form, and the same footer with the "proud member of the H&S Group" strip.
Brand colours are navy, silver and blue only (no gold).

* `assets/css/main.css` and `assets/js/main.js` are **identical to the other group sites**. Change one, copy to all.
* No Tailwind, no build step.
* The form posts to FormSubmit by AJAX (`data-formsubmit` attribute on the form), with a standard POST fallback.
  It currently sends to `info@hsholdings.ca`.
* Photography: Unsplash images (free licence, hotlinked with size parameters), each checked against the
  service it sits next to. Search for `images.unsplash.com` to swap in real project photos.
* All copy comes from the client's H&S Services website brief (Nov 18, 2026). Spelling follows the other
  sites (Canadian: "centres"), "&" is written as "and" in body copy, and there are no dashes in sentences.

### Upload
1. Create a new public repository named **`hsservices`** under `officialrevmedia`.
2. Upload the contents of this folder to the repository root (Add file > Upload files).
3. Settings > Pages > Deploy from a branch > `main` / root.
4. The site will be live at https://officialrevmedia.github.io/hsservices/

If the repository gets a different name, update the URL in `index.html` (canonical, og:url and the JSON-LD
block), `robots.txt` and `sitemap.xml`. The 404 page adapts to any repository name on its own.

### Page flow
Hero > belt > Who We Are > Three Pillars (3 photo cards) > Airline Cutlery Packing >
Building Maintenance and Janitorial > Commercial Laundry > Linen Cycle (5 stages) > Sectors >
Why H&S Services > How We Work (4 steps) > Procurement > Clients > Careers > FAQ > Contact.

### Photos used
| Where | Photo |
| --- | --- |
| Hero | Polished stainless steel forks laid out in rows |
| Who We Are | Laundry team member with folded linens |
| Card 01, Airline Cutlery Packing | Forks sorted in rows beside stacked plates |
| Cutlery section | Hand placing a cutlery set on a napkin on a tray |
| Card 02, Building Maintenance and Janitorial | Ride-on floor scrubber in an exhibition hall |
| Facilities section | Empty exhibition hall with a polished floor |
| Card 03, Commercial Laundry | Team folding towels in a commercial laundry |
| Laundry section | Row of industrial front-load washers |
| Careers | Laundry team folding and stacking linens |

### To confirm with the client
* **Contact details.** The brief has none, so the site uses the H&S Group details from the Group and
  Construction sites: 6841 Airport Rd, Mississauga, ON L4V 1E6, 905-450-9214, info@hsholdings.ca,
  Monday to Friday 9:00 AM to 5:00 PM. These are the same details already out for confirmation.
* **Domain.** Canonical and sitemap point at the GitHub Pages address until the live domain is confirmed.
* **Client logo wall.** Same set as the H&S Group and H&S Construction sites, labelled "A selection of clients
  served across the H&S Group of companies". Remove the `#clients` section (and its nav and footer links) if
  H&S Services should only show its own clients.
* **Claims taken from the brief** that should be verified before go-live: "Hygiene-certified", "100% food-safe
  protocols", "100% client retention focus", "domestic and international carriers", and the dedicated commercial
  laundry facility.
* **Sections added to match the other sites** that are not in the brief: Careers (links to the H&S Group careers
  page) and the FAQ (every answer is drawn from the brief).
* **Real photos.** Cutlery packing line, laundry facility and on-site janitorial crews, whenever available.

### Go-live
* Add a `CNAME` file containing the live domain once DNS points to GitHub Pages, then replace
  `https://officialrevmedia.github.io/hsservices/` in `index.html`, `robots.txt` and `sitemap.xml`.
* The first form submission triggers a FormSubmit activation email to info@hsholdings.ca (already activated
  if the Group or Construction form has been used).
* On the H&S Group site, the H&S Services card on Companies & Services still says "Launching soon" and links to
  the contact page. Point it at this site and replace the placeholder copy.
