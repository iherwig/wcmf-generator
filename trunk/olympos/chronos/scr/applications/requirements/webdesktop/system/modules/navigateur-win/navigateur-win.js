
QoDesk.NavigateurWindow = Ext.extend(Ext.app.Module, {
	
	moduleType : 'demo',
    moduleId : 'demo-navigateur',
    
    init : function(){
        this.launcher = {
            handler : this.createWindow,
            iconCls:'tabs',
            scope: this,
            shortcutIconCls: 'demo-navigateur-shortcut',
            text: 'Navigateur (TEST)',
            tooltip: '<b>Tab Window</b><br />A window with tabs'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('navigateur-win');
        if(!win){
			
        	var winWidth = desktop.getWinWidth() / 1.1;
			var winHeight = desktop.getWinHeight() / 1.05;

//---------------------------------------------------------------------------------------------
//                                Début de ma Form Favoris
//---------------------------------------------------------------------------------------------

    var AjouterFavoris = new Ext.FormPanel({
        labelWidth: 105, 
        url:'system/modules/navigateur-win/echo.php',
        frame:true,
        bodyStyle:'padding:5px 5px 0',
        width: 300,
        defaults: {width: 230},
        defaultType: 'textfield',

        items: [{
                fieldLabel: 'Nom',
                name: 'nom',
                allowBlank:false
            },{
                fieldLabel: 'Adresse',
                name: 'adresse',
				value: 'http://www.',
				allowBlank:false
            },{
            xtype: 'textarea',
            hideLabel: false,
			fieldLabel:'Commentaires',
            name: 'msg',
//          anchor: '100% -53',  // anchor width by percentage and height by raw adjustment
            name: 'commentaires'
			},{
                xtype: 'datefield',
                fieldLabel: 'Date',
                name: 'date'
			}]
    	});

//---------------------------------------------------------------------------------------------
//                                Fin de ma Form Favoris
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//                                  Début de AjoutFavoris
//---------------------------------------------------------------------------------------------
  
  var Favoris_add = new Ext.Window({
        title: 'Ajouter un favoris',
         width:380,
         height:235,
		 
         layout:'fit',
         border:false,
		 closeAction: 'hide',
         items:[AjouterFavoris],
         buttons:[{

                     text:'Enregistrer'
                    ,handler: function() {
                        AjouterFavoris.getForm().timeout = 5;
                        AjouterFavoris.getForm().submit({
                             success: function(form, action) {
								store.reload();
                                Ext.Msg.alert('Succès', 'Sauvegarde effectuée, Merci...');
								
                            }
                            ,failure: function(form, action) {
                                Ext.Msg.alert('Erreur', 'Une erreure c\'est produite');
                            }
                            ,timeout:5
                        });
                    }
                        },{
            text:'Annuler',
			handler: function(){
			Favoris_add.hide(); 
		}

        }]
    });
  
//---------------------------------------------------------------------------------------------
//                                 Fin de AjoutFavoris
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//                               Déclaration de ma grille
//---------------------------------------------------------------------------------------------

	var store = new Ext.data.JsonStore({
	url: 'system/modules/navigateur-win/grid_php.php', 	
    root: 'datos',
	totalProperty: 'total',
    fields: [{name:'nom'},
			 {name:'adresse'},
			 {name:'commentaires'},
			 {name:'date'}]
	});
	store.load({
	params: { 
		start: 0, 
		limit: 50
			}		   
			   });
	
	
	var grid = new Ext.grid.GridPanel({
    store: store,
    columns: [
        {header: "Nom", width: 150, sortable: true, resizable : true, sortable: true, dataIndex: 'nom'},
        {header: "Adresse", width: 150, sortable: true, resizable : true, sortable: true, hidden : true, dataIndex: 'adresse'},
        {header: "Commentaires", width: 150, sortable: true, resizable : true, sortable: true, hidden : true, dataIndex: 'commentaires'},
		{header: "Date", width: 150, sortable: true, resizable : true, sortable: true, hidden : true, dataIndex: 'date'}
		],
    viewConfig: {
        forceFit: true
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	bbar: new Ext.PagingToolbar({
            pageSize: 50,
            store: store,
            displayInfo: false
        }),
    width:600,
	border: false,	
	loadMask: true,
	loadMask : {
                msg : 'Chargement...'
    },
    height:300,
    frame:false
	});
	

// Added Selection Call - 2008-08-03.
    grid.selModel.on('rowselect', function() {
        var newUrl = grid.selModel.getSelected().data.adresse;
	Ext.getCmp('accueil').iframe.setSrc(newUrl);
    });
// End of added call.

	grid.render;
	
//---------------------------------------------------------------------------------------------
//                               Fin de déclaration de ma grille
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//                                Début des fonctions (browser)
//---------------------------------------------------------------------------------------------

        	var inputArea = new Ext.form.Field({value: 'http://www.google.fr', width:500});


			var comeHome = function(){ Ext.getCmp('accueil').activeTab.setSrc();},

			/* Une autre version du print
			function printBill(){																								
					try{
						Ext.get('previewIframe').print();
					}catch(ex){Ext.Msg.alert('Sorry','Print Failure!<br />'+ex);}								
				}
			*/

			printPanel = function(){
               try{
                  Ext.getCmp('accueil').iframe.getWindow().print() ;
              }catch(ex){Ext.Msg.alert('Erreur','L\'impression n\'est pas encore supportée !');}
           },
		   
           _urlDelim = '\/',
           getLocationAbsolute = function(){
               var d= _urlDelim = location.href.indexOf('\/') != -1 ? '\/':'\\';
               var u=location.href.split(d);
               u.pop(); //this page
               return u.join(d);
           },
           getSiteRoot = function(){
            var url = getLocationAbsolute().split(_urlDelim );
            url.pop();
                    return url.join(_urlDelim);
           },
		   
//---------------------------------------------------------------------------------------------
//                               Fin des fonctions (browser)
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//                               Déclaration de mon panel
//---------------------------------------------------------------------------------------------


			mappanel = new Ext.Panel({
				border: false,
                margins:'3 3 3 0',
                cmargins:'3 3 3 0',
				layout: 'fit',
				iconCls:'google',
				region: 'center',
					items:[{
					iconCls:'google',								
					id:'accueil',
					xtype:'iframepanel',
					loadMask:{msg:'<center>Chargement en cours..</center>'},
					defaultSrc:'http://www.google.fr',
					closable:false							
				}]
				
			});


//---------------------------------------------------------------------------------------------
//                               Fin de déclaration de mon panel
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//                               Déclaration de mon panneau West
//---------------------------------------------------------------------------------------------

				var Favoris_west = new Ext.Panel({
                title: 'Favoris',
                region: 'west',
                split: true,
                width: 220,
				minWidth: 220,
                collapsible: true,
				collapseMode: 'mini',
				animCollapse: false,
                margins:'3 0 3 3',
                cmargins:'3 3 3 3',
                layout:'fit',
                iconCls: 'icon-favoris',
					tbar:['->',{
						iconCls: 'icon-favoris-add',
						scope: this,
						handler: function() {
							Favoris_add.show();
						}
					},'-',{
						iconCls: 'icon-refresh',
						scope: this,
						handler: function refreshGrid() {
							store.reload();
						} 	
					}],
				
				items:[grid]
            });

//---------------------------------------------------------------------------------------------
//                               Fin de déclaration de mon panneau West
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//                                    Création de mon window
//---------------------------------------------------------------------------------------------
			
            win = desktop.createWindow({
                id: 'navigateur-win',
                title:'Navigateur (TEST)',
                layout: 'border',
				width:winWidth,
				height:winHeight,
				x:desktop.getWinX(winWidth),
				y:desktop.getWinY(winHeight),
                iconCls: 'tabs',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
				tbar:[{
					iconCls: 'icon-precedent',
                    tooltip:{title:'Précédent', text:'Page précédente'},
					handler: function(){window.history.back()}
				},{
					iconCls: 'icon-suivant',
                    tooltip:{title:'Suivant', text:'Page suivante'},
					handler: function(){window.history.forward()}					
				},'-',{
					iconCls: 'icon-favoris',
                    tooltip:{title:'Favoris', text:'Afficher/Cacher les favoris'},
					handler: function() {
						Favoris_west.collapse()?Favoris_west.collapse():Favoris_west.expand();
					}.createDelegate(this),
					scope: this
				},'-',{
					iconCls: 'icon-house',
                    tooltip:{title:'Accueil', text:'Retour à l\accueil'},
					handler: function(btn){
						Ext.getCmp('accueil').setSrc("http://www.google.fr");
					}
				},"-",inputArea,{	
					iconCls: 'icon-go',
                    tooltip:{title:'Se rendre', text:'Se rendre à l\'adresse indiquée'},
                    handler: function(){
					{
							var inputstring = inputArea.getValue();
							Ext.getCmp('accueil').iframe.setSrc(inputstring);
						}
					}
					},'-',{
						iconCls: 'icon-refresh',
						scope: this,
						
                        id: 'refresh',
                        qtip: 'Refresh Metrics',
                            handler: function(){
                               Ext.getCmp('accueil').reload;
                            },

					},'->','&nbsp;&nbsp;',{
					iconCls: 'icon-printer',
                    tooltip:{title:'Imprimer', text:'Imprimer la page courante'},
                    handler: printPanel
				},'-',{
					iconCls: 'icon-preferences',
                    tooltip:{title:'Préférences', text:'Préférences de l\'application'},
				    scope: this
				},'-',{
					iconCls: 'icon-info',
                    tooltip:{title:'Informations', text:'A propos de l\'application'},
				    scope: this
				}],

				items:[Favoris_west, mappanel]
            });
        }
        win.show();
    }
});

//---------------------------------------------------------------------------------------------
//                             Fin de création de mon window
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//                          Applet de l'iframe - Version : 0.48
//---------------------------------------------------------------------------------------------

Ext.ux.ManagedIFrame=function(){var B=Array.prototype.slice.call(arguments,0),D=Ext.get(B[0]),A=B[0];if(D&&D.dom&&D.dom.tagName=="IFRAME"){A=B[1]||{}}else{A=B[0]||B[1]||{};D=A.autoCreate?Ext.get(Ext.DomHelper.append(document.body,Ext.apply({tag:"iframe",src:(Ext.isIE&&Ext.isSecure)?Ext.SSL_SECURE_URL:""},A.autoCreate))):null}if(!D||D.dom.tagName!="IFRAME"){return D}!!D.dom.name.length||(D.dom.name=D.dom.id);this.addEvents({"domready":true,"documentloaded":true});if(A.listeners){this.listeners=A.listeners;Ext.ux.ManagedIFrame.superclass.constructor.call(this)}Ext.apply(D,this);D.addClass("x-managed-iframe");D.loadMask=Ext.apply({msg:"Loading..",msgCls:"x-mask-loading",maskEl:null,enabled:!!A.loadMask},A.loadMask);var C=Ext.isIE?"onreadystatechange":"onload";D.dom[C]=D.dom[C]?D.dom[C].createSequence(D.loadHandler,D):D.loadHandler.createDelegate(D);if(A.src){D.setSrc(A.src)}else{D.src=D.dom.src||null;var E=A.html||A.content||false;if(E){D.update(E)}}return D};Ext.extend(Ext.ux.ManagedIFrame,Ext.util.Observable,{setSrc:function(A,B){var C=A||this.src||(Ext.isIE&&Ext.isSecure?Ext.SSL_SECURE_URL:"");this.showMask();this._windowContext=null;(function(){var D=typeof C=="function"?C()||"":C;if(Ext.isOpera){this.dom.src=""}this.dom.src=D}).defer(100,this);if(B!==true){this.src=C}},scriptRE:/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/gi,update:function(B,A,D){A=A||this.getUpdateManager().loadScripts||false;this._windowContext=false;B=Ext.DomHelper.markup(B||"");var C=this.getDocument();if(C){this._inUpdate=true;this.showMask();C.open();C.write(A===true?B:B.replace(this.scriptRE,""));C.write('<script type="text/javascript">(function(){'+"var MSIE/*@cc_on =1@*/;"+"parent.Ext.get('"+this.dom.id+"')._windowContext=MSIE?this:{eval:function(s){return eval(s);}}"+"})();<\/script>");C.close();if(!!B.length){this.checkDOM(false,D)}else{if(D){D()}}}return this},_windowContext:null,getDocument:function(){return this.getWindow().document},getWindow:function(){var A=this.dom;return A?A.contentWindow||window.frames[A.name]:window},print:function(){try{var B=this.getWindow();if(Ext.isIE){B.focus()}B.print()}catch(A){throw"print exception: "+(A.description||A)}},destroy:function(){this.removeAllListeners();if(this.dom){this.dom.onreadystatechange=null;this.dom.onload=null;if(this.dom.src){this.dom.src="javascript:false"}Ext.removeNode(this.dom)}this._windowContext=null;Ext.apply(this.loadMask,{masker:null,maskEl:null})},execScript:function(block){if(this._windowContext){return this._windowContext.eval(block)}else{throw"execScript:no script context"}},loadMask:{msg:"Loading..",msgCls:"x-mask-loading",maskEl:null,enabled:false},showMask:function(D,C,B){if(this.loadMask&&(this.loadMask.enabled||B)){var A=this.loadMask;A.masker||(A.masker=Ext.get(A.maskEl||this.dom.parentNode||this.wrap({tag:"div",style:{position:"relative"}})));A.masker.mask(D||A.msg,C||A.msgCls)}},hideMask:function(B){var A=this.loadMask;if(A&&A.masker&&(A.enabled||B)&&(B||!!this.dom.src.length||this._inUpdate)){A.masker.unmask()}},loadHandler:function(B){var A=this.dom.readyState||B.type;switch(A){case"loading":this.showMask();break;case"load":case"complete":this.fireEvent("documentloaded",this);this.hideMask();this._inUpdate=false;break;default:}},checkDOM:function(C,E){var D=0,C=C||this.getWindow(),B=this;var A=function(){var F=false;F=(C.document&&typeof C.document.getElementsByTagName!="undefined"&&(C.document.getElementsByTagName("body")[0]!=null||C.document.body!=null));if(D++<70&&!F){A.defer(50);return }if(E){E()}B.fireEvent("domready",B)};A()}});Ext.ux.ManagedIframePanel=Ext.extend(Ext.Panel,{bodyCfg:{tag:"div",cls:"x-panel-body",children:[{tag:"iframe",frameBorder:0,cls:"x-managed-iframe",style:{width:"100%",height:"100%"},html:"Inline frames are not enabled/supported by your browser."}]},defaultSrc:null,iframeStyle:{overflow:"auto"},loadMask:false,animCollapse:false,autoScroll:false,closable:true,initComponent:function(){Ext.ux.ManagedIframePanel.superclass.initComponent.call(this);this.addEvents({documentloaded:true,domready:true});if(this.defaultSrc){this.on("render",this.setSrc.createDelegate(this,[this.defaultSrc],0),this,{single:true})}},beforeDestroy:function(){if(this.rendered){if(this.tools){for(var A in this.tools){Ext.destroy(this.tools[A])}}if(this.header&&this.headerAsText){var B;if(B=this.header.child("span")){B.remove()}this.header.update("")}Ext.each(["iframe","header","topToolbar","bottomToolbar","footer","loadMask","body","bwrap"],function(C){if(this[C]){if(typeof this[C].destroy=="function"){this[C].destroy()}else{Ext.destroy(this[C])}this[C]=null;delete this[C]}},this)}Ext.ux.ManagedIframePanel.superclass.beforeDestroy.call(this)},onDestroy:function(){Ext.Panel.superclass.onDestroy.call(this)},onRender:function(B,A){Ext.ux.ManagedIframePanel.superclass.onRender.call(this,B,A);if(this.iframe=this.body.child("iframe.x-managed-iframe")){if(this.loadMask){this.loadMask=Ext.apply({enabled:true,maskEl:this.body},this.loadMask)}this.iframe=new Ext.ux.ManagedIFrame(this.iframe,{loadMask:this.loadMask});this.loadMask=this.iframe.loadMask;this.iframe.ownerCt=this;this.relayEvents(this.iframe,["documentloaded","domready"]);if(this.iframeStyle){this.iframe.applyStyles(this.iframeStyle)}this.getUpdater().showLoadIndicator=!this.loadMask.enabled}},afterRender:function(A){var B=this.html;delete this.html;Ext.ux.ManagedIframePanel.superclass.afterRender.call(this);if(B&&this.iframe){this.iframe.update(typeof B=="object"?Ext.DomHelper.markup(B):B)}},setSrc:function(A,B){var C=A||this.defaultSrc||(Ext.isIE&&Ext.isSecure?Ext.SSL_SECURE_URL:"");if(this.rendered&&this.iframe){this.iframe.setSrc(C,B)}if(B!==true){this.defaultSrc=C}this.saveState()},getState:function(){return Ext.apply(Ext.ux.ManagedIframePanel.superclass.getState.call(this)||{},{defaultSrc:(typeof this.defaultSrc=="function")?this.defaultSrc():this.defaultSrc})},getUpdater:function(){return this.rendered?(this.iframe||this.body).getUpdater():false},load:function(B){var A;if(A=this.getUpdater()){if(B&&B.renderer){A.setRenderer(B.renderer);delete B.renderer}A.update.apply(A,arguments)}return this},doAutoLoad:function(){this.load(typeof this.autoLoad=="object"?this.autoLoad:{url:this.autoLoad})}});Ext.reg("iframepanel",Ext.ux.ManagedIframePanel);Ext.ux.ManagedIframePortlet=Ext.extend(Ext.ux.ManagedIframePanel,{anchor:"100%",frame:true,collapsible:true,draggable:true,cls:"x-portlet"});Ext.reg("iframeportlet",Ext.ux.ManagedIframePortlet)

//---------------------------------------------------------------------------------------------
//                         Fin de l'Applet de l'iframe - Version : 0.48
//---------------------------------------------------------------------------------------------

