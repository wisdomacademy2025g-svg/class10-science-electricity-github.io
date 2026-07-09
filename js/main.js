$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

		var index = 'hprlasttab';
		var width_key = 'hprsidebar';
    //  Define friendly data store name
		var dataStore = window.localStorage;
    //  Start magic!
		try {
        // getter: Fetch previous value
			var oldwidth = 0;
			var oldIndex = dataStore.getItem(index);
			oldwidth = dataStore.getItem(width_key);
		} catch(e) {
        // getter: Always default to first tab in error state
			var oldIndex = 0;
		}
		
        
		// init tabs
		jQuery(document).ready(function($){
			$('base').remove();
			
			$("#hprtabs").tabs({
				// The zero-based index of the panel that is active (open)
				active : oldIndex,
				// Triggered after a tab has been activated
				activate : function( event, ui ){
					//  Get future value
					var newIndex = ui.newTab.parent().children().index(ui.newTab);
					//  Set future value
					dataStore.setItem( index, newIndex ) 
				}
		}
		);

		if (oldwidth != 0) {
		    var sidebar = $("#hprsidebar");
		    sidebar.width(oldwidth);	
	            var parent = $("#hprmain");
	            var remainingSpace = parent.width() - sidebar.outerWidth();
	            var content = $("#hprcontent");
	            var contentwidth = (remainingSpace - 10 - (content.outerWidth() - content.width()))/parent.width()*100+"%";
                    content.width(contentwidth);

		};

		$('#hprtoctree').jstree({
			"state" : { "key" : "webhelptree" },
				    "types" : {
				      "b" : {
				        "icon" : "images/bookopen.png"
				      },
				      "p" : {
				        "icon" : "images/page.png"
				      }
				    },
			    "plugins" : [ "types", "state" ]
		  });

		$('#hprtoctree').bind('changed.jstree', function (e, data) {
			var href = data.node.a_attr.href;
	                document.location.href = href;			
		});
			
		$("input[type=submit]" ).button();
		
		
		$('#indextree').jstree({"core":{"themes":{"icons":false}},
                                       "plugins": ["core"]});

		$('#indextree').bind('changed.jstree', function (e, data) {
			var href = data.node.a_attr.href;
	                document.location.href = href;			
		});


                $('pre code').each(function(i, block) {
                  hljs.highlightBlock(block);
                });

                $(".slider").slick({dots: true, arrows: true});


    $("#hprsidebar").resizable(
    {
        autoHide: true,
        handles: 'e',
        resize: function(e, ui) 
        {
            var parent = ui.element.parent();
            var remainingSpace = parent.width() - ui.element.outerWidth(),
                divTwo = ui.element.next(),
                divTwoWidth = (remainingSpace - 10 - (divTwo.outerWidth() - divTwo.width()))/parent.width()*100+"%";
                divTwo.width(divTwoWidth);
        },
        stop: function(e, ui) 
        {
            var parent = ui.element.parent();
            ui.element.css(
            {
                width: ui.element.width()/parent.width()*100+"%",
            });
	    var sidebarwidth = ui.element.width();
	    var dataStore = window.localStorage;
	    dataStore.setItem("hprsidebar", sidebarwidth);				
        }
    });

    var term=unescape($.getUrlVar("s"));
	
    if (term != "") {
      $.each(term.split(" "), function(index, value){
         $("body").highlight(value);
	});
    }


}); 

$( window ).resize(function() {
		    var sidebar = $("#hprsidebar");
		    sidebar.width(oldwidth);	
	            var parent = $("#hprmain");
	            var remainingSpace = parent.width() - sidebar.outerWidth();
	            var content = $("#hprcontent");
	            var contentwidth = (remainingSpace - 10 - (content.outerWidth() - content.width()))/parent.width()*100+"%";
                    content.width(contentwidth);
});