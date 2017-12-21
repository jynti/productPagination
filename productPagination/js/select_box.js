function SelectBox(name, optionValues, domElement){
  this.name = name;
  this.optionValues = optionValues;
  this.sideFilter = domElement.sideFilters;
  this.productContentArea = domElement.productContentArea;
  this.footer = domElement.footer;
}

SelectBox.prototype.init = function(){
  this.createOptions();
}

SelectBox.prototype.createOptions = function(){
  var selectBox = $("<select></select>").addClass("select-box");

  for(var i = 0; i < this.optionValues.length; i++){
    var option = $("<option></option>");
    if(i == 0) {option.prop("selected", true);}
    option.attr("value", this.optionValues[i][0]).text(this.optionValues[i][1]);
    selectBox.append(option);
  }

  var _this = this;
  selectBox.on("change", function(){
    _this.selectedValue = $(this).val();
    _this.constructor.selectedValue = $(this).val();
    _this.onChangeEvent()
  });
  this.sideFilter.append(selectBox);
  this.sideFilter.append("<hr>");
}

SelectBox.prototype.onChangeEvent = function(){
  this.visibleProducts = Product.getVisibleProducts();
  if(this.name == "pagination"){
    this.createFooter();
    Product.show(0, this.selectedValue-1, this.visibleProducts, this.productContentArea);
  }
}

SelectBox.prototype.createFooter = function(){
  var domDetails = {
    footer: this.footer,
    productContentArea: this.productContentArea
  }

  var footer = new Footer(this.visibleProducts, this.selectedValue, domDetails);
  footer.init();
  footer.highlightButton(0);
}

SelectBox.getPresentlySelectedValue = function(){
  if(!this.selectedValue){
    this.selectedValue = "20"
  }
  return this.selectedValue;
}
