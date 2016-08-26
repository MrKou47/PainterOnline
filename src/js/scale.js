var scale = function (btn,bar,title){
	this.btn=document.getElementById(btn);
	this.bar=document.getElementById(bar);
	this.title=document.getElementById(title);
	this.step=this.bar.getElementsByTagName("div")[0];
	this.init();
};
scale.prototype={
	init:function (){
		var f = this,
			g = document,
			b = window,
			m = Math;
		f.btn.onmousedown = function(e) {
			var x=(e||b.event).clientX;
			var l=this.offsetLeft;
			var max=f.bar.offsetWidth-this.offsetWidth;
			t = $(this);
			g.onmousemove=function (e){
				var thisX=(e||b.event).clientX;
				var to=m.min(max,m.max(-2,l+(thisX-x)));
				f.btn.style.left=to+'px';
				f.ondrag(m.round(m.max(0,to/max)*100),to);
				b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
			};
			// g.onmouseup=new Function('this.onmousemove=null');
			g.onmouseup = function () {
				this.onmousemove=null;
				console.log(t);

				var s = t.css('left').split('px')[0]>1?t.css('left').split('px')[0]:1;
				// t.data('size', s);
				t.attr('data-size' ,s);
			}
		};
	},
	ondrag:function (pos,x){
		this.step.style.width=Math.max(0,x)+'px';
		if (this.title) {
			this.title.innerHTML=pos+'%';
		}
	}
}