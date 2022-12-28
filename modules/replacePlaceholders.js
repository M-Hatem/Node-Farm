// A function to replace placeholders
module.exports = (tempCard, el) => {
  let output = tempCard.replace(/{%image%}/g, el.image);
  output = output.replace(/{%id%}/g, el.id);
  output = output.replace(/{%productName%}/g, el.productName);
  output = output.replace(/{%from%}/g, el.from);
  output = output.replace(/{%nutrients%}/g, el.nutrients);
  output = output.replace(/{%quantity%}/g, el.quantity);
  output = output.replace(/{%price%}/g, el.price);
  output = output.replace(/{%description%}/g, el.description);
  if (!el.organic) output = output.replace(/{%organic%}/g, "not-organic");

  return output;
};
