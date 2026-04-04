import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const TOP_DESIGN_TITLES = [
  "Freedom Is My Love Language Raglan Shirt",
  "Freedom Is My Love Language Women's Tee - Patriotic Eagle Flag Graphic Shirt",
  "USA Patriotic Women's V-Neck Tee — Red White Blue Stars & Ribbon",
  "America Land of the Free Tee — Patriotic Eagle T-Shirt for Women",
  "God Bless America Car Magnet — Patriotic American Flag Vehicle Decal (Copy)",
  "God, Family, Country Garden Flag — Patriotic Outdoor House Banner",
  "God Bless America Garden Flag — Patriotic Outdoor House Banner Est. 1776",
  "Live Free Stay Ready Garden Flag — Patriotic Coiled Snake Outdoor Banner",
  "Garden Flag — \"Party Like It's 1776\" Patriotic Revolutionary War Decorative House & Yard Banner",
  "Garden Flag — \"Stay Strapped or Get Clapped\" Patriotic Founding Fathers Banner",
  "Veteran Garden Flag - \"I Have Earned It\" Military House Banner",
  "We the People US Flag American Pride Constitution Patriotic T-Shirt",
  "Jesus is King Shirt, Christian Shirts Faith, Jesus Lover Shirt, Bible Verse T-Shirt, Cross Shirt, Christian Shirts for Men",
  "Usa Shirt Women Patriotic American Flag Distressed T-Shirt",
  "3X5 Ft American Patriotic Gadsden Flag - 3X5 Ft. PS216GF - We the People",
  "Party Like a Patriot Plastic Tumbler with Straw",
  "Car Magnet — \"God Family Country Freedom\" American Flag Patriotic Magnet",
  "Car Magnet — \"God Family Country\" American Flag Patriotic Magnet",
  "God Bless America Car Magnet — Patriotic American Flag Vehicle Decal",
  "Car Magnet — \"250 Years of Freedom Since 1776\" Patriotic American Flag Design",
  "One Nation Under God American Flag Car Magnet — Patriotic Christian Vehicle Decal",
  "Come And Take It Car Magnet — Patriotic Texas Cannon Design",
  "God Bless America Car Magnet — Patriotic American Flag Vehicle Decal",
  "God Family Country American Flag Car Magnet",
  "Patriotic \"God Family Country\" Car Magnet - Red, White & Blue Faith Shield",
  "Veterans Memorial Car Magnet — \"We Don't Know Them All But We Owe Them All\" with American Flag",
  "One Nation Under God Patriotic Car Magnet",
  "250th Salute to America Military Car Magnet — Patriotic American Flag Veteran Tribute",
  "Car Magnet — \"Try Jesus Before You Try Me\" Religious Christian Car Magnet",
  "Patriot Crewneck Sweatshirt — \"Party Like a Patriot\" Vintage American Presidents Design",
  "Car Magnet - \"This Is My Pride Flag\" Distressed American Flag Patriotic Sticker",
  "Salute to America 250th Anniversary T-Shirt — Patriotic Fourth of July Tee",
  "We The People Skull Raglan Shirt",
  "Party Like a Patriot Raglan Shirt — Vintage Pop Art Founding Fathers Tee",
  "Patriotic Raglan Shirt - \"On a Scale of One to America, How Free Are You Tonight?\"",
  "God Bless America Patriotic Flag Tee",
  "Party Like It's 1776 Matte Poster — Colorful Founding Fathers Wall Art",
  "Party Like It's 1776 Coffee Mug",
  "Skeleton With Flaming Head Tee — \"Blind Obedience to Authority is the Greatest Enemy of Truth\" Graphic Shirt",
  "1776 Party Sweatshirt — \"Party Like It's 1776\" Patriotic Crewneck",
  "Party Elite It's 1776 T-Shirt - Retro Pop Art Founding Fathers Tee",
  "Patriotic 'With Guns We Are Citizens' T-Shirt",
  "Unapologetic Patriot T-Shirt — American Flag Text Tee",
  "DO-214 Veteran T-Shirt — \"It's a Veteran Thing, You Wouldn't Understand\" Eagle Tee",
  "Ladies' V-Neck T-Shirt — \"Live Free Stay Ready\" Gadsden Snake Graphic",
  "'Jesus Saves' Embroidered Cross Hat",
  "Unapologetic Patriot Car Magnet — American Flag Text Magnetic Decal",
  "Freedom American Flag Car Magnet — Patriotic 'FREEDOM' Vehicle Decal",
  "Don't Tread on Me Fitted Tee",
  "Men's Tank — \"My Rights Don't End Where Your Feelings Begin\" Vintage Gadsden Snake Tee",
  "Unapologetic Patriot Snapback Trucker Cap — Embroidered USA Flag Design",
  "Vintage Embroidered \"FREEDOM\" Flag Cap",
  "God Family Country T-Shirt — Patriotic Christian Tee",
  "Political Graphic Tee — \"I Smell Commies\" Reagan Patriotic T-Shirt",
  "Freedom Embroidered Trucker Hat — USA Flag Snapback",
  "God Family Country T-Shirt - Patriotic American Flag Tee",
  "Be The Light Women's Tee — Torch Republic Inspirational Graphic Shirt",
  "Classic Black & White Letterman Jacket — Gold Crest Torch Republic Logo",
  "Torch Republic Embroidered Trucker Cap — Patriotic Mesh Snapback Hat",
  "Regulators Mount Up T-Shirt",
  "Unapologetic Patriot Hoodie — American Flag Graphic Pullover",
  "Freedom American Flag Women's Tee",
  "God Family Country T-Shirt — Patriotic Christian Tee",
  "Embroidered 'Come and Take It' Trucker Snapback Hat",
  "Constitution Embroidered Trucker Cap — \"We Have This Thing Called Constitution\" Snapback",
  "William Howard Taft Bobblehead",
  "Andrew Jackson v2 Bobblehead",
  "Robert E. Lee Bobblehead",
  "Calvin Coolidge Bobblehead",
  "Ulysses S. Grant Bobblehead",
  "Jimmy Carter V2 Bobblehead",
  "Thomas Jefferson Bobblehead",
  "Teddy Roosevelt Bobblehead",
  "Woodrow Wilson Bobblehead",
  "Winston Churchill Bobblehead",
  "Uncle Sam Bobblehead",
  "Statue of Liberty Bobblehead",
  "Nikola Tesla Bobblehead",
  "Alexander Hamilton Bobblehead",
  "Jesus Christ Bobblehead",
  "Rosie the Riveter Bobblehead",
  "George Washington Bobblehead",
  "James Madison Bobblehead",
  "John Adams Bobblehead",
  "Ben Franklin V2 Bobblehead",
  "Albert Einstein v2 Bobblehead",
  "Edgar Allan Poe Bobblehead",
  "USA Flag Full-Zip Hoodie — American Flag Zip Up Hoodie",
  "Liberty or Death Tee — Patriotic Eagle Graphic T-Shirt",
  "Constitution \"We the People\" 20oz Tumbler - Patriotic Stainless Travel Cup",
  "Patriotic Camouflage Cropped Hoodie — \"All Gave Some, Some Gave All\"",
  "Patriotic Eagle Raglan Shirt - \"Freedom is My Love Language\" 3/4 Sleeve",
  "You Can't Touch My Freedom Cactus Tank Top",
  "We the People Constitution T-Shirt — Patriotic American History Tee",
  "2nd Amendment T-Shirt — \"The 2nd Amendment Protects Everything\" Patriotic Flag Gun Tee",
  "Don't Tread On Me T-Shirt — Gadsden Flag Snake Patriotic Tee",
  "Patriotic Graphic Tee - \"Oh, I'm Sorry I Thought This Was America?\" Shirt",
  "USA Flag Muscle Tank Top — Patriotic Sleeveless Jersey for All American Summer",
  "Patriotic Eagle \"Sorry I Can't Hear You Over All This Freedom\" Tank Top",
  "All Gave Some, Some Gave All T-Shirt — Patriotic Veterans Tribute Tee",
  "Freedom Eagle Raglan Shirt — \"Sorry I Can't Hear You Over the Sound of My Freedom\"",
  "Patriotic Rights T-Shirt — \"My Rights Don't End Where Your Feelings Begin\" Gadsden Tee",
  "Raglan Shirt — \"Stay Strapped or Get Clapped\" Patriotic George Washington Design",
  "Constitution Quote T-Shirt — \"We Have This Thing Called The Constitution\" Patriotic Tee",
  "Freedom USA Flag V-Neck Tee",
  "Come And Take It Patriotic Tee",
  "Come and Take It T-Shirt — Patriotic Founding Fathers Graphic Tee",
  "Raglan Shirt - Revolutionary Don't Tread on Me",
  "Patriotic Freedom Eagle V-Neck Tee — \"Sorry I Can't Hear You Over All This Freedom\"",
  "Truth Light Freedom Torchbearer Women's Washed Mesh-Back Cap",
  "I Stand for the Flag and Kneel for the Cross Men's Cotton T-Shirt",
  "American Freedom Is Not Free T-Shirt",
  "Red Rhinestone American Flag Print Handled 40oz Thermos Tumbler",
  "American Flags for outside 4X6 Ft, Embroidered Heavy Duty USA Flags for Outdoor High Wind, All Weather US Flag with 2 Brass Grommets and Sewn Stripes",
  "2 PACK American Flag 3X5 Ft - Embroidered Stars Sewn Stripes Durable Uv Protected Brass Grommets Perfect for Indoor/Outdoor Use US USA Flags Bonus Pack",
  "4Th of July Patriotic Memorial Day Garden Flag 12X18 Inch Double Sided Outside, American Stars and Stripes Yard Outdoor Decoration",
  "T-Shirt — \"Live Free Stay Ready\" Gadsden Snake Patriotic Tee",
  "Gadsden Snake \"Don't Tread on Me\" Tee | Patriotic Flag Graphic",
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const allProducts = await base44.entities.Product.list('', 500);
    let updated = 0;

    for (const product of allProducts) {
      const isTopDesign = TOP_DESIGN_TITLES.includes(product.title);
      
      if (product.is_top_design !== isTopDesign) {
        await base44.entities.Product.update(product.id, { is_top_design: isTopDesign });
        if (isTopDesign) updated++;
      }
    }

    return Response.json({ 
      success: true, 
      message: `Marked ${updated} products as top designs`,
      total_products: allProducts.length 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});