declare class UserWidget {
  // FIXME: 暂时不对外暴露
  // 内置命名空间
  // get sys(): {
  //   readonly id: string;
  //   readonly module: string;
  //   readonly component: string;
  //   readonly parent: UserWidget;
  //   readonly children: UserWidget[];

  //   closest(filter?: (parentWidget: UserWidget) => boolean): UserWidget | null;
  // };

  // FIXME: 暂时不对外暴露
  // 自定义命名空间
  // get custom(): { [key: string]: any };

  // ========== 快捷访问方式 ========== //

  /**
   * 组件 ID，微搭中一般由编辑器生成
   */
  readonly id: string;
  /**
   * 组件库名
   */
  readonly module: string;
  /**
   * 组件名
   */
  readonly component: string;

  /**
   * 父组件引用
   */
  readonly parent: UserWidget;
  /**
   * 子组件集合
   */
  readonly children: UserWidget[];

  // FIXME: 暂时不对外暴露
  // closest(filter?: (parentWidget: UserWidget) => boolean): UserWidget | null;
}

// Used Components Inner Begin

        /**
        * gsd_h5_react_Carousel
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"}}}}
        */
        declare class gsd_h5_react_Carousel extends UserWidget {

          

          
        }
        

        /**
        * gsd_h5_react_Container
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"data":{"title":"数据","description":"该属性用于区块动态项配置，可通过 $w.<id>.data 引用到","default":{},"type":"object","patternProperties":{"^(.*)$":{}}}}}}
        */
        declare class gsd_h5_react_Container extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 数据
 * 该属性用于区块动态项配置，可通过 $w.<id>.data 引用到
 * @privateForWeDa
 * {"displayType":"object","displayName":"数据","description":"该属性用于区块动态项配置，可通过 $w.<id>.data 引用到","schema":null,"dataFieldInfo":{"type":"object"}}
 */
data?: {
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.*)$".
 */
[k: string]: any
}
[k: string]: any


          
        }
        

        /**
        * gsd_h5_react_WdIcon
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"type":{"type":"string","enum":["inner","custom"],"x-component-props":{"options":[{"text":"预置图标","value":"inner","label":"预置图标"},{"text":"自定义图标","value":"custom","label":"自定义图标"}]},"x-index":10,"title":"图标类型","x-runtime-default":"inner","description":"选择图标的类型","x-linkages":[{"type":"value:visible","target":"*(name)","condition":"{{$self.value=='inner'}}"},{"type":"value:visible","target":"*(src)","condition":"{{$self.value=='custom'}}"}],"default":"inner"},"name":{"type":"string","enum":["td:add-circle","td:add-rectangle","td:add","td:app","td:arrow-down-rectangle","td:arrow-down","td:arrow-left","td:arrow-right","td:arrow-up","td:attach","td:backtop-rectangle","td:backtop","td:backward","td:barcode","td:books","td:browse-off","td:browse","td:bulletpoint","td:calendar","td:call","td:caret-down-small","td:caret-down","td:caret-left-small","td:caret-left","td:caret-right-small","td:caret-right","td:caret-up-small","td:caret-up","td:cart","td:chart-bar","td:chart-bubble","td:chart-pie","td:chart","td:chat","td:check-circle-filled","td:check-circle","td:check-rectangle-filled","td:check-rectangle","td:check","td:chevron-down-circle","td:chevron-down-rectangle","td:chevron-down","td:chevron-left-circle","td:chevron-left-double","td:chevron-left-rectangle","td:chevron-left","td:chevron-right-circle","td:chevron-right-double","td:chevron-right-rectangle","td:chevron-right","td:chevron-up-circle","td:chevron-up-rectangle","td:chevron-up","td:circle","td:clear","td:close-circle-filled","td:close-circle","td:close-rectangle","td:close","td:cloud-download","td:cloud-upload","td:cloud","td:code","td:control-platform","td:creditcard","td:dashboard","td:delete","td:desktop","td:discount-filled","td:discount","td:download","td:edit-1","td:edit","td:ellipsis","td:enter","td:error-circle-filled","td:error-circle","td:error","td:file-add","td:file-copy","td:file-excel","td:file-image","td:file-paste","td:file-pdf","td:file-powerpoint","td:file-unknown","td:file-word","td:file","td:filter-clear","td:filter","td:flag","td:folder-add","td:folder-open","td:folder","td:fork","td:format-horizontal-align-bottom","td:format-horizontal-align-center","td:format-horizontal-align-top","td:format-vertical-align-center","td:format-vertical-align-left","td:format-vertical-align-right","td:forward","td:fullscreen-exit","td:fullscreen","td:gender-female","td:gender-male","td:gift","td:heart-filled","td:heart","td:help-circle-filled","td:help-circle","td:help","td:history","td:home","td:hourglass","td:image","td:info-circle-filled","td:info-circle","td:internet","td:jump","td:laptop","td:layers","td:link-unlink","td:link","td:location","td:lock-off","td:lock-on","td:login","td:logo-android","td:logo-apple-filled","td:logo-apple","td:logo-chrome-filled","td:logo-chrome","td:logo-codepen","td:logo-github-filled","td:logo-github","td:logo-ie-filled","td:logo-ie","td:logo-windows-filled","td:logo-windows","td:logout","td:mail","td:menu-fold","td:menu-unfold","td:minus-circle-filled","td:minus-circle","td:minus-rectangle","td:mobile-vibrate","td:mobile","td:money-circle","td:more","td:move","td:next","td:notification-filled","td:notification","td:order-adjustment-column","td:order-ascending","td:order-descending","td:page-first","td:page-last","td:pause-circle-filled","td:photo","td:play-circle-filled","td:play-circle-stroke","td:play-circle","td:play","td:poweroff","td:precise-monitor","td:previous","td:print","td:qrcode","td:queue","td:rectangle","td:refresh","td:remove","td:rollback","td:root-list","td:round","td:save","td:scan","td:search","td:secured","td:server","td:service","td:setting","td:share","td:shop","td:slash","td:sound","td:star-filled","td:star","td:stop-circle-1","td:stop-circle-filled","td:stop-circle","td:stop","td:swap-left","td:swap-right","td:swap","td:thumb-down","td:thumb-up","td:time-filled","td:time","td:tips","td:tools","td:unfold-less","td:unfold-more","td:upload","td:usb","td:user-add","td:user-avatar","td:user-circle","td:user-clear","td:user-talk","td:user","td:usergroup-add","td:usergroup-clear","td:usergroup","td:video","td:view-column","td:view-list","td:view-module","td:wallet","td:wifi","td:zoom-in","td:zoom-out","nointernet","success","warning","pending","refresh","folder","arrowup","arrowdown","arrowleft","arrowright","chevronup","chevrondown","chevronleft","chevronright","delete","edit","search","check","close","add","download","success-fill","close-fill","info-fill","pending-fill","warning-fill","more","star","star-fill","location","question"],"x-component-props":{"options":[{"text":"td:add-circle","value":"td:add-circle","label":"td:add-circle"},{"text":"td:add-rectangle","value":"td:add-rectangle","label":"td:add-rectangle"},{"text":"td:add","value":"td:add","label":"td:add"},{"text":"td:app","value":"td:app","label":"td:app"},{"text":"td:arrow-down-rectangle","value":"td:arrow-down-rectangle","label":"td:arrow-down-rectangle"},{"text":"td:arrow-down","value":"td:arrow-down","label":"td:arrow-down"},{"text":"td:arrow-left","value":"td:arrow-left","label":"td:arrow-left"},{"text":"td:arrow-right","value":"td:arrow-right","label":"td:arrow-right"},{"text":"td:arrow-up","value":"td:arrow-up","label":"td:arrow-up"},{"text":"td:attach","value":"td:attach","label":"td:attach"},{"text":"td:backtop-rectangle","value":"td:backtop-rectangle","label":"td:backtop-rectangle"},{"text":"td:backtop","value":"td:backtop","label":"td:backtop"},{"text":"td:backward","value":"td:backward","label":"td:backward"},{"text":"td:barcode","value":"td:barcode","label":"td:barcode"},{"text":"td:books","value":"td:books","label":"td:books"},{"text":"td:browse-off","value":"td:browse-off","label":"td:browse-off"},{"text":"td:browse","value":"td:browse","label":"td:browse"},{"text":"td:bulletpoint","value":"td:bulletpoint","label":"td:bulletpoint"},{"text":"td:calendar","value":"td:calendar","label":"td:calendar"},{"text":"td:call","value":"td:call","label":"td:call"},{"text":"td:caret-down-small","value":"td:caret-down-small","label":"td:caret-down-small"},{"text":"td:caret-down","value":"td:caret-down","label":"td:caret-down"},{"text":"td:caret-left-small","value":"td:caret-left-small","label":"td:caret-left-small"},{"text":"td:caret-left","value":"td:caret-left","label":"td:caret-left"},{"text":"td:caret-right-small","value":"td:caret-right-small","label":"td:caret-right-small"},{"text":"td:caret-right","value":"td:caret-right","label":"td:caret-right"},{"text":"td:caret-up-small","value":"td:caret-up-small","label":"td:caret-up-small"},{"text":"td:caret-up","value":"td:caret-up","label":"td:caret-up"},{"text":"td:cart","value":"td:cart","label":"td:cart"},{"text":"td:chart-bar","value":"td:chart-bar","label":"td:chart-bar"},{"text":"td:chart-bubble","value":"td:chart-bubble","label":"td:chart-bubble"},{"text":"td:chart-pie","value":"td:chart-pie","label":"td:chart-pie"},{"text":"td:chart","value":"td:chart","label":"td:chart"},{"text":"td:chat","value":"td:chat","label":"td:chat"},{"text":"td:check-circle-filled","value":"td:check-circle-filled","label":"td:check-circle-filled"},{"text":"td:check-circle","value":"td:check-circle","label":"td:check-circle"},{"text":"td:check-rectangle-filled","value":"td:check-rectangle-filled","label":"td:check-rectangle-filled"},{"text":"td:check-rectangle","value":"td:check-rectangle","label":"td:check-rectangle"},{"text":"td:check","value":"td:check","label":"td:check"},{"text":"td:chevron-down-circle","value":"td:chevron-down-circle","label":"td:chevron-down-circle"},{"text":"td:chevron-down-rectangle","value":"td:chevron-down-rectangle","label":"td:chevron-down-rectangle"},{"text":"td:chevron-down","value":"td:chevron-down","label":"td:chevron-down"},{"text":"td:chevron-left-circle","value":"td:chevron-left-circle","label":"td:chevron-left-circle"},{"text":"td:chevron-left-double","value":"td:chevron-left-double","label":"td:chevron-left-double"},{"text":"td:chevron-left-rectangle","value":"td:chevron-left-rectangle","label":"td:chevron-left-rectangle"},{"text":"td:chevron-left","value":"td:chevron-left","label":"td:chevron-left"},{"text":"td:chevron-right-circle","value":"td:chevron-right-circle","label":"td:chevron-right-circle"},{"text":"td:chevron-right-double","value":"td:chevron-right-double","label":"td:chevron-right-double"},{"text":"td:chevron-right-rectangle","value":"td:chevron-right-rectangle","label":"td:chevron-right-rectangle"},{"text":"td:chevron-right","value":"td:chevron-right","label":"td:chevron-right"},{"text":"td:chevron-up-circle","value":"td:chevron-up-circle","label":"td:chevron-up-circle"},{"text":"td:chevron-up-rectangle","value":"td:chevron-up-rectangle","label":"td:chevron-up-rectangle"},{"text":"td:chevron-up","value":"td:chevron-up","label":"td:chevron-up"},{"text":"td:circle","value":"td:circle","label":"td:circle"},{"text":"td:clear","value":"td:clear","label":"td:clear"},{"text":"td:close-circle-filled","value":"td:close-circle-filled","label":"td:close-circle-filled"},{"text":"td:close-circle","value":"td:close-circle","label":"td:close-circle"},{"text":"td:close-rectangle","value":"td:close-rectangle","label":"td:close-rectangle"},{"text":"td:close","value":"td:close","label":"td:close"},{"text":"td:cloud-download","value":"td:cloud-download","label":"td:cloud-download"},{"text":"td:cloud-upload","value":"td:cloud-upload","label":"td:cloud-upload"},{"text":"td:cloud","value":"td:cloud","label":"td:cloud"},{"text":"td:code","value":"td:code","label":"td:code"},{"text":"td:control-platform","value":"td:control-platform","label":"td:control-platform"},{"text":"td:creditcard","value":"td:creditcard","label":"td:creditcard"},{"text":"td:dashboard","value":"td:dashboard","label":"td:dashboard"},{"text":"td:delete","value":"td:delete","label":"td:delete"},{"text":"td:desktop","value":"td:desktop","label":"td:desktop"},{"text":"td:discount-filled","value":"td:discount-filled","label":"td:discount-filled"},{"text":"td:discount","value":"td:discount","label":"td:discount"},{"text":"td:download","value":"td:download","label":"td:download"},{"text":"td:edit-1","value":"td:edit-1","label":"td:edit-1"},{"text":"td:edit","value":"td:edit","label":"td:edit"},{"text":"td:ellipsis","value":"td:ellipsis","label":"td:ellipsis"},{"text":"td:enter","value":"td:enter","label":"td:enter"},{"text":"td:error-circle-filled","value":"td:error-circle-filled","label":"td:error-circle-filled"},{"text":"td:error-circle","value":"td:error-circle","label":"td:error-circle"},{"text":"td:error","value":"td:error","label":"td:error"},{"text":"td:file-add","value":"td:file-add","label":"td:file-add"},{"text":"td:file-copy","value":"td:file-copy","label":"td:file-copy"},{"text":"td:file-excel","value":"td:file-excel","label":"td:file-excel"},{"text":"td:file-image","value":"td:file-image","label":"td:file-image"},{"text":"td:file-paste","value":"td:file-paste","label":"td:file-paste"},{"text":"td:file-pdf","value":"td:file-pdf","label":"td:file-pdf"},{"text":"td:file-powerpoint","value":"td:file-powerpoint","label":"td:file-powerpoint"},{"text":"td:file-unknown","value":"td:file-unknown","label":"td:file-unknown"},{"text":"td:file-word","value":"td:file-word","label":"td:file-word"},{"text":"td:file","value":"td:file","label":"td:file"},{"text":"td:filter-clear","value":"td:filter-clear","label":"td:filter-clear"},{"text":"td:filter","value":"td:filter","label":"td:filter"},{"text":"td:flag","value":"td:flag","label":"td:flag"},{"text":"td:folder-add","value":"td:folder-add","label":"td:folder-add"},{"text":"td:folder-open","value":"td:folder-open","label":"td:folder-open"},{"text":"td:folder","value":"td:folder","label":"td:folder"},{"text":"td:fork","value":"td:fork","label":"td:fork"},{"text":"td:format-horizontal-align-bottom","value":"td:format-horizontal-align-bottom","label":"td:format-horizontal-align-bottom"},{"text":"td:format-horizontal-align-center","value":"td:format-horizontal-align-center","label":"td:format-horizontal-align-center"},{"text":"td:format-horizontal-align-top","value":"td:format-horizontal-align-top","label":"td:format-horizontal-align-top"},{"text":"td:format-vertical-align-center","value":"td:format-vertical-align-center","label":"td:format-vertical-align-center"},{"text":"td:format-vertical-align-left","value":"td:format-vertical-align-left","label":"td:format-vertical-align-left"},{"text":"td:format-vertical-align-right","value":"td:format-vertical-align-right","label":"td:format-vertical-align-right"},{"text":"td:forward","value":"td:forward","label":"td:forward"},{"text":"td:fullscreen-exit","value":"td:fullscreen-exit","label":"td:fullscreen-exit"},{"text":"td:fullscreen","value":"td:fullscreen","label":"td:fullscreen"},{"text":"td:gender-female","value":"td:gender-female","label":"td:gender-female"},{"text":"td:gender-male","value":"td:gender-male","label":"td:gender-male"},{"text":"td:gift","value":"td:gift","label":"td:gift"},{"text":"td:heart-filled","value":"td:heart-filled","label":"td:heart-filled"},{"text":"td:heart","value":"td:heart","label":"td:heart"},{"text":"td:help-circle-filled","value":"td:help-circle-filled","label":"td:help-circle-filled"},{"text":"td:help-circle","value":"td:help-circle","label":"td:help-circle"},{"text":"td:help","value":"td:help","label":"td:help"},{"text":"td:history","value":"td:history","label":"td:history"},{"text":"td:home","value":"td:home","label":"td:home"},{"text":"td:hourglass","value":"td:hourglass","label":"td:hourglass"},{"text":"td:image","value":"td:image","label":"td:image"},{"text":"td:info-circle-filled","value":"td:info-circle-filled","label":"td:info-circle-filled"},{"text":"td:info-circle","value":"td:info-circle","label":"td:info-circle"},{"text":"td:internet","value":"td:internet","label":"td:internet"},{"text":"td:jump","value":"td:jump","label":"td:jump"},{"text":"td:laptop","value":"td:laptop","label":"td:laptop"},{"text":"td:layers","value":"td:layers","label":"td:layers"},{"text":"td:link-unlink","value":"td:link-unlink","label":"td:link-unlink"},{"text":"td:link","value":"td:link","label":"td:link"},{"text":"td:location","value":"td:location","label":"td:location"},{"text":"td:lock-off","value":"td:lock-off","label":"td:lock-off"},{"text":"td:lock-on","value":"td:lock-on","label":"td:lock-on"},{"text":"td:login","value":"td:login","label":"td:login"},{"text":"td:logo-android","value":"td:logo-android","label":"td:logo-android"},{"text":"td:logo-apple-filled","value":"td:logo-apple-filled","label":"td:logo-apple-filled"},{"text":"td:logo-apple","value":"td:logo-apple","label":"td:logo-apple"},{"text":"td:logo-chrome-filled","value":"td:logo-chrome-filled","label":"td:logo-chrome-filled"},{"text":"td:logo-chrome","value":"td:logo-chrome","label":"td:logo-chrome"},{"text":"td:logo-codepen","value":"td:logo-codepen","label":"td:logo-codepen"},{"text":"td:logo-github-filled","value":"td:logo-github-filled","label":"td:logo-github-filled"},{"text":"td:logo-github","value":"td:logo-github","label":"td:logo-github"},{"text":"td:logo-ie-filled","value":"td:logo-ie-filled","label":"td:logo-ie-filled"},{"text":"td:logo-ie","value":"td:logo-ie","label":"td:logo-ie"},{"text":"td:logo-windows-filled","value":"td:logo-windows-filled","label":"td:logo-windows-filled"},{"text":"td:logo-windows","value":"td:logo-windows","label":"td:logo-windows"},{"text":"td:logout","value":"td:logout","label":"td:logout"},{"text":"td:mail","value":"td:mail","label":"td:mail"},{"text":"td:menu-fold","value":"td:menu-fold","label":"td:menu-fold"},{"text":"td:menu-unfold","value":"td:menu-unfold","label":"td:menu-unfold"},{"text":"td:minus-circle-filled","value":"td:minus-circle-filled","label":"td:minus-circle-filled"},{"text":"td:minus-circle","value":"td:minus-circle","label":"td:minus-circle"},{"text":"td:minus-rectangle","value":"td:minus-rectangle","label":"td:minus-rectangle"},{"text":"td:mobile-vibrate","value":"td:mobile-vibrate","label":"td:mobile-vibrate"},{"text":"td:mobile","value":"td:mobile","label":"td:mobile"},{"text":"td:money-circle","value":"td:money-circle","label":"td:money-circle"},{"text":"td:more","value":"td:more","label":"td:more"},{"text":"td:move","value":"td:move","label":"td:move"},{"text":"td:next","value":"td:next","label":"td:next"},{"text":"td:notification-filled","value":"td:notification-filled","label":"td:notification-filled"},{"text":"td:notification","value":"td:notification","label":"td:notification"},{"text":"td:order-adjustment-column","value":"td:order-adjustment-column","label":"td:order-adjustment-column"},{"text":"td:order-ascending","value":"td:order-ascending","label":"td:order-ascending"},{"text":"td:order-descending","value":"td:order-descending","label":"td:order-descending"},{"text":"td:page-first","value":"td:page-first","label":"td:page-first"},{"text":"td:page-last","value":"td:page-last","label":"td:page-last"},{"text":"td:pause-circle-filled","value":"td:pause-circle-filled","label":"td:pause-circle-filled"},{"text":"td:photo","value":"td:photo","label":"td:photo"},{"text":"td:play-circle-filled","value":"td:play-circle-filled","label":"td:play-circle-filled"},{"text":"td:play-circle-stroke","value":"td:play-circle-stroke","label":"td:play-circle-stroke"},{"text":"td:play-circle","value":"td:play-circle","label":"td:play-circle"},{"text":"td:play","value":"td:play","label":"td:play"},{"text":"td:poweroff","value":"td:poweroff","label":"td:poweroff"},{"text":"td:precise-monitor","value":"td:precise-monitor","label":"td:precise-monitor"},{"text":"td:previous","value":"td:previous","label":"td:previous"},{"text":"td:print","value":"td:print","label":"td:print"},{"text":"td:qrcode","value":"td:qrcode","label":"td:qrcode"},{"text":"td:queue","value":"td:queue","label":"td:queue"},{"text":"td:rectangle","value":"td:rectangle","label":"td:rectangle"},{"text":"td:refresh","value":"td:refresh","label":"td:refresh"},{"text":"td:remove","value":"td:remove","label":"td:remove"},{"text":"td:rollback","value":"td:rollback","label":"td:rollback"},{"text":"td:root-list","value":"td:root-list","label":"td:root-list"},{"text":"td:round","value":"td:round","label":"td:round"},{"text":"td:save","value":"td:save","label":"td:save"},{"text":"td:scan","value":"td:scan","label":"td:scan"},{"text":"td:search","value":"td:search","label":"td:search"},{"text":"td:secured","value":"td:secured","label":"td:secured"},{"text":"td:server","value":"td:server","label":"td:server"},{"text":"td:service","value":"td:service","label":"td:service"},{"text":"td:setting","value":"td:setting","label":"td:setting"},{"text":"td:share","value":"td:share","label":"td:share"},{"text":"td:shop","value":"td:shop","label":"td:shop"},{"text":"td:slash","value":"td:slash","label":"td:slash"},{"text":"td:sound","value":"td:sound","label":"td:sound"},{"text":"td:star-filled","value":"td:star-filled","label":"td:star-filled"},{"text":"td:star","value":"td:star","label":"td:star"},{"text":"td:stop-circle-1","value":"td:stop-circle-1","label":"td:stop-circle-1"},{"text":"td:stop-circle-filled","value":"td:stop-circle-filled","label":"td:stop-circle-filled"},{"text":"td:stop-circle","value":"td:stop-circle","label":"td:stop-circle"},{"text":"td:stop","value":"td:stop","label":"td:stop"},{"text":"td:swap-left","value":"td:swap-left","label":"td:swap-left"},{"text":"td:swap-right","value":"td:swap-right","label":"td:swap-right"},{"text":"td:swap","value":"td:swap","label":"td:swap"},{"text":"td:thumb-down","value":"td:thumb-down","label":"td:thumb-down"},{"text":"td:thumb-up","value":"td:thumb-up","label":"td:thumb-up"},{"text":"td:time-filled","value":"td:time-filled","label":"td:time-filled"},{"text":"td:time","value":"td:time","label":"td:time"},{"text":"td:tips","value":"td:tips","label":"td:tips"},{"text":"td:tools","value":"td:tools","label":"td:tools"},{"text":"td:unfold-less","value":"td:unfold-less","label":"td:unfold-less"},{"text":"td:unfold-more","value":"td:unfold-more","label":"td:unfold-more"},{"text":"td:upload","value":"td:upload","label":"td:upload"},{"text":"td:usb","value":"td:usb","label":"td:usb"},{"text":"td:user-add","value":"td:user-add","label":"td:user-add"},{"text":"td:user-avatar","value":"td:user-avatar","label":"td:user-avatar"},{"text":"td:user-circle","value":"td:user-circle","label":"td:user-circle"},{"text":"td:user-clear","value":"td:user-clear","label":"td:user-clear"},{"text":"td:user-talk","value":"td:user-talk","label":"td:user-talk"},{"text":"td:user","value":"td:user","label":"td:user"},{"text":"td:usergroup-add","value":"td:usergroup-add","label":"td:usergroup-add"},{"text":"td:usergroup-clear","value":"td:usergroup-clear","label":"td:usergroup-clear"},{"text":"td:usergroup","value":"td:usergroup","label":"td:usergroup"},{"text":"td:video","value":"td:video","label":"td:video"},{"text":"td:view-column","value":"td:view-column","label":"td:view-column"},{"text":"td:view-list","value":"td:view-list","label":"td:view-list"},{"text":"td:view-module","value":"td:view-module","label":"td:view-module"},{"text":"td:wallet","value":"td:wallet","label":"td:wallet"},{"text":"td:wifi","value":"td:wifi","label":"td:wifi"},{"text":"td:zoom-in","value":"td:zoom-in","label":"td:zoom-in"},{"text":"td:zoom-out","value":"td:zoom-out","label":"td:zoom-out"},{"text":"nointernet","value":"nointernet","label":"nointernet"},{"text":"success","value":"success","label":"success"},{"text":"warning","value":"warning","label":"warning"},{"text":"pending","value":"pending","label":"pending"},{"text":"refresh","value":"refresh","label":"refresh"},{"text":"folder","value":"folder","label":"folder"},{"text":"arrowup","value":"arrowup","label":"arrowup"},{"text":"arrowdown","value":"arrowdown","label":"arrowdown"},{"text":"arrowleft","value":"arrowleft","label":"arrowleft"},{"text":"arrowright","value":"arrowright","label":"arrowright"},{"text":"chevronup","value":"chevronup","label":"chevronup"},{"text":"chevrondown","value":"chevrondown","label":"chevrondown"},{"text":"chevronleft","value":"chevronleft","label":"chevronleft"},{"text":"chevronright","value":"chevronright","label":"chevronright"},{"text":"delete","value":"delete","label":"delete"},{"text":"edit","value":"edit","label":"edit"},{"text":"search","value":"search","label":"search"},{"text":"check","value":"check","label":"check"},{"text":"close","value":"close","label":"close"},{"text":"add","value":"add","label":"add"},{"text":"download","value":"download","label":"download"},{"text":"success-fill","value":"success-fill","label":"success-fill"},{"text":"close-fill","value":"close-fill","label":"close-fill"},{"text":"info-fill","value":"info-fill","label":"info-fill"},{"text":"pending-fill","value":"pending-fill","label":"pending-fill"},{"text":"warning-fill","value":"warning-fill","label":"warning-fill"},{"text":"more","value":"more","label":"more"},{"text":"star","value":"star","label":"star"},{"text":"star-fill","value":"star-fill","label":"star-fill"},{"text":"location","value":"location","label":"location"},{"text":"question","value":"question","label":"question"}]},"x-index":20,"title":"图标样式","default":"success","x-component":"icon2","description":"选择预置图标"},"src":{"title":"自定义图标","x-runtime-default":"","x-component":"image","x-index":30,"x-rules":[{"message":"请输入合法的图片地址","pattern":"^(((cloud|https?)://)|/resources/)[^\\s]+$"}],"description":"设置自定义图标地址","type":"string","default":""},"size":{"type":"string","enum":["xs","sm","md","lg","xl"],"x-component-props":{"options":[{"text":"超小","value":"xs","label":"超小"},{"text":"小","value":"sm","label":"小"},{"text":"中","value":"md","label":"中"},{"text":"大","value":"lg","label":"大"},{"text":"超大","value":"xl","label":"超大"}]},"x-index":40,"title":"图标尺寸","x-runtime-default":"md","description":"设置图标的尺寸大小","x-category":"基础属性","default":"md"}},"required":["name"]}}
        */
        declare class gsd_h5_react_WdIcon extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 图标类型
 * 选择图标的类型
 * @privateForWeDa
 * {"displayType":"string","displayName":"图标类型","description":"选择图标的类型","schema":null,"dataFieldInfo":{"type":"string"}}
 */
type?: ("inner" | "custom")
/**
 * 图标样式
 * 选择预置图标
 * @privateForWeDa
 * {"displayType":"string","displayName":"图标样式","description":"选择预置图标","schema":null,"dataFieldInfo":{"type":"string"}}
 */
name: ("td:add-circle" | "td:add-rectangle" | "td:add" | "td:app" | "td:arrow-down-rectangle" | "td:arrow-down" | "td:arrow-left" | "td:arrow-right" | "td:arrow-up" | "td:attach" | "td:backtop-rectangle" | "td:backtop" | "td:backward" | "td:barcode" | "td:books" | "td:browse-off" | "td:browse" | "td:bulletpoint" | "td:calendar" | "td:call" | "td:caret-down-small" | "td:caret-down" | "td:caret-left-small" | "td:caret-left" | "td:caret-right-small" | "td:caret-right" | "td:caret-up-small" | "td:caret-up" | "td:cart" | "td:chart-bar" | "td:chart-bubble" | "td:chart-pie" | "td:chart" | "td:chat" | "td:check-circle-filled" | "td:check-circle" | "td:check-rectangle-filled" | "td:check-rectangle" | "td:check" | "td:chevron-down-circle" | "td:chevron-down-rectangle" | "td:chevron-down" | "td:chevron-left-circle" | "td:chevron-left-double" | "td:chevron-left-rectangle" | "td:chevron-left" | "td:chevron-right-circle" | "td:chevron-right-double" | "td:chevron-right-rectangle" | "td:chevron-right" | "td:chevron-up-circle" | "td:chevron-up-rectangle" | "td:chevron-up" | "td:circle" | "td:clear" | "td:close-circle-filled" | "td:close-circle" | "td:close-rectangle" | "td:close" | "td:cloud-download" | "td:cloud-upload" | "td:cloud" | "td:code" | "td:control-platform" | "td:creditcard" | "td:dashboard" | "td:delete" | "td:desktop" | "td:discount-filled" | "td:discount" | "td:download" | "td:edit-1" | "td:edit" | "td:ellipsis" | "td:enter" | "td:error-circle-filled" | "td:error-circle" | "td:error" | "td:file-add" | "td:file-copy" | "td:file-excel" | "td:file-image" | "td:file-paste" | "td:file-pdf" | "td:file-powerpoint" | "td:file-unknown" | "td:file-word" | "td:file" | "td:filter-clear" | "td:filter" | "td:flag" | "td:folder-add" | "td:folder-open" | "td:folder" | "td:fork" | "td:format-horizontal-align-bottom" | "td:format-horizontal-align-center" | "td:format-horizontal-align-top" | "td:format-vertical-align-center" | "td:format-vertical-align-left" | "td:format-vertical-align-right" | "td:forward" | "td:fullscreen-exit" | "td:fullscreen" | "td:gender-female" | "td:gender-male" | "td:gift" | "td:heart-filled" | "td:heart" | "td:help-circle-filled" | "td:help-circle" | "td:help" | "td:history" | "td:home" | "td:hourglass" | "td:image" | "td:info-circle-filled" | "td:info-circle" | "td:internet" | "td:jump" | "td:laptop" | "td:layers" | "td:link-unlink" | "td:link" | "td:location" | "td:lock-off" | "td:lock-on" | "td:login" | "td:logo-android" | "td:logo-apple-filled" | "td:logo-apple" | "td:logo-chrome-filled" | "td:logo-chrome" | "td:logo-codepen" | "td:logo-github-filled" | "td:logo-github" | "td:logo-ie-filled" | "td:logo-ie" | "td:logo-windows-filled" | "td:logo-windows" | "td:logout" | "td:mail" | "td:menu-fold" | "td:menu-unfold" | "td:minus-circle-filled" | "td:minus-circle" | "td:minus-rectangle" | "td:mobile-vibrate" | "td:mobile" | "td:money-circle" | "td:more" | "td:move" | "td:next" | "td:notification-filled" | "td:notification" | "td:order-adjustment-column" | "td:order-ascending" | "td:order-descending" | "td:page-first" | "td:page-last" | "td:pause-circle-filled" | "td:photo" | "td:play-circle-filled" | "td:play-circle-stroke" | "td:play-circle" | "td:play" | "td:poweroff" | "td:precise-monitor" | "td:previous" | "td:print" | "td:qrcode" | "td:queue" | "td:rectangle" | "td:refresh" | "td:remove" | "td:rollback" | "td:root-list" | "td:round" | "td:save" | "td:scan" | "td:search" | "td:secured" | "td:server" | "td:service" | "td:setting" | "td:share" | "td:shop" | "td:slash" | "td:sound" | "td:star-filled" | "td:star" | "td:stop-circle-1" | "td:stop-circle-filled" | "td:stop-circle" | "td:stop" | "td:swap-left" | "td:swap-right" | "td:swap" | "td:thumb-down" | "td:thumb-up" | "td:time-filled" | "td:time" | "td:tips" | "td:tools" | "td:unfold-less" | "td:unfold-more" | "td:upload" | "td:usb" | "td:user-add" | "td:user-avatar" | "td:user-circle" | "td:user-clear" | "td:user-talk" | "td:user" | "td:usergroup-add" | "td:usergroup-clear" | "td:usergroup" | "td:video" | "td:view-column" | "td:view-list" | "td:view-module" | "td:wallet" | "td:wifi" | "td:zoom-in" | "td:zoom-out" | "nointernet" | "success" | "warning" | "pending" | "refresh" | "folder" | "arrowup" | "arrowdown" | "arrowleft" | "arrowright" | "chevronup" | "chevrondown" | "chevronleft" | "chevronright" | "delete" | "edit" | "search" | "check" | "close" | "add" | "download" | "success-fill" | "close-fill" | "info-fill" | "pending-fill" | "warning-fill" | "more" | "star" | "star-fill" | "location" | "question")
/**
 * 自定义图标
 * 设置自定义图标地址
 * @privateForWeDa
 * {"displayType":"string","displayName":"自定义图标","description":"设置自定义图标地址","schema":null,"dataFieldInfo":{"type":"string"}}
 */
src?: string
/**
 * 图标尺寸
 * 设置图标的尺寸大小
 * @privateForWeDa
 * {"displayType":"string","displayName":"图标尺寸","description":"设置图标的尺寸大小","schema":null,"dataFieldInfo":{"type":"string"}}
 */
size?: ("xs" | "sm" | "md" | "lg" | "xl")
[k: string]: any


          
        }
        

        /**
        * gsd_h5_react_WdText
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"text":{"title":"文本内容","x-component":"textarea","default":"文本内容","x-category":"基础属性","x-index":10,"description":"设置文本的内容","type":"string"},"level":{"type":"string","enum":["body-default","body-sm","body-md","body-lg","title-1","title-2","title-3","title-4","title-5","title-6","title-7","title-8","title-9"],"x-component-props":{"options":[{"text":"正文(默认)","value":"body-default","label":"正文(默认)"},{"text":"正文(小)","value":"body-sm","label":"正文(小)"},{"text":"正文(中)","value":"body-md","label":"正文(中)"},{"text":"正文(大)","value":"body-lg","label":"正文(大)"},{"text":"标题 H1","value":"title-1","label":"标题 H1"},{"text":"标题 H2","value":"title-2","label":"标题 H2"},{"text":"标题 H3","value":"title-3","label":"标题 H3"},{"text":"标题 H4","value":"title-4","label":"标题 H4"},{"text":"标题 H5","value":"title-5","label":"标题 H5"},{"text":"标题 H6","value":"title-6","label":"标题 H6"},{"text":"标题 H7","value":"title-7","label":"标题 H7"},{"text":"标题 H8","value":"title-8","label":"标题 H8"},{"text":"标题 H9","value":"title-9","label":"标题 H9"}]},"x-index":20,"title":"文本格式","x-runtime-default":"body-default","description":"设置文本格式，支持正文(小、中、大)和标题(H1-H6)","x-category":"基础属性","default":"body-default"},"overflow":{"title":"溢出省略","type":"boolean","x-runtime-default":false,"x-linkages":[{"type":"value:visible","target":"maxLines","condition":"{{$self.value === true}}"}],"x-category":"高级属性","description":"文本长度超过最大行数用省略展示，开启后，会添加display:-webkit-box !import 样式，可能会导致文本布局失效","x-index":30,"default":false},"maxLines":{"type":"string","enum":["1","2","3","4","5","6","7","8","9","10"],"x-component-props":{"options":[{"text":"1","value":"1","label":"1"},{"text":"2","value":"2","label":"2"},{"text":"3","value":"3","label":"3"},{"text":"4","value":"4","label":"4"},{"text":"5","value":"5","label":"5"},{"text":"6","value":"6","label":"6"},{"text":"7","value":"7","label":"7"},{"text":"8","value":"8","label":"8"},{"text":"9","value":"9","label":"9"},{"text":"10","value":"10","label":"10"}]},"x-index":40,"title":"最大行数","description":"若文本长度超过最大行数，超出内容以省略号代替；因小程序侧限制，应用发布为小程序时，开启文本可选中会导致最大行数的配置不生效","x-helper-text":"若文本长度超过最大行数，超出内容以省略号代替；因小程序侧限制，应用发布为小程序时，开启文本可选中会导致最大行数的配置不生效","default":"1","x-category":"高级属性"},"tips":{"title":"展示文本气泡","type":"boolean","description":"开启后鼠标悬停在文本组件上会展示文本气泡，仅PC端有效","x-runtime-default":true,"x-category":"高级属性","x-index":50,"default":true},"space":{"title":"连续空格","type":"boolean","x-runtime-default":true,"x-category":"高级属性","description":"关闭时多个空格会自动转换成单个空格，web端文本内容的换行以空格展示，换行不生效。","x-helper-text":"关闭时多个空格会自动转换成单个空格，web端文本内容的换行以空格展示，换行不生效。","x-index":60,"default":true},"userSelect":{"title":"是否可选中","type":"boolean","x-runtime-default":false,"x-index":70,"x-category":"高级属性","description":"是否可选中文本，关闭后文本将不支持进行选中，无法进行复制等常见文本操作","x-helper-text":"因小程序侧限制，应用发布为小程序时，开启文本可选中会导致最大行数配置不生效、会导致文本修饰线（下划线、删除线等）配置不生效","default":false}},"required":["text"]}}
        */
        declare class gsd_h5_react_WdText extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 文本内容
 * 设置文本的内容
 * @privateForWeDa
 * {"displayType":"string","displayName":"文本内容","description":"设置文本的内容","schema":null,"dataFieldInfo":{"type":"string"}}
 */
text: string
/**
 * 文本格式
 * 设置文本格式，支持正文(小、中、大)和标题(H1-H6)
 * @privateForWeDa
 * {"displayType":"string","displayName":"文本格式","description":"设置文本格式，支持正文(小、中、大)和标题(H1-H6)","schema":null,"dataFieldInfo":{"type":"string"}}
 */
level?: ("body-default" | "body-sm" | "body-md" | "body-lg" | "title-1" | "title-2" | "title-3" | "title-4" | "title-5" | "title-6" | "title-7" | "title-8" | "title-9")
/**
 * 溢出省略
 * 文本长度超过最大行数用省略展示，开启后，会添加display:-webkit-box !import 样式，可能会导致文本布局失效
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"溢出省略","description":"文本长度超过最大行数用省略展示，开启后，会添加display:-webkit-box !import 样式，可能会导致文本布局失效","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
overflow?: boolean
/**
 * 最大行数
 * 若文本长度超过最大行数，超出内容以省略号代替；因小程序侧限制，应用发布为小程序时，开启文本可选中会导致最大行数的配置不生效
 * @privateForWeDa
 * {"displayType":"string","displayName":"最大行数","description":"若文本长度超过最大行数，超出内容以省略号代替；因小程序侧限制，应用发布为小程序时，开启文本可选中会导致最大行数的配置不生效","schema":null,"dataFieldInfo":{"type":"string"}}
 */
maxLines?: ("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10")
/**
 * 展示文本气泡
 * 开启后鼠标悬停在文本组件上会展示文本气泡，仅PC端有效
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"展示文本气泡","description":"开启后鼠标悬停在文本组件上会展示文本气泡，仅PC端有效","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
tips?: boolean
/**
 * 连续空格
 * 关闭时多个空格会自动转换成单个空格，web端文本内容的换行以空格展示，换行不生效。
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"连续空格","description":"关闭时多个空格会自动转换成单个空格，web端文本内容的换行以空格展示，换行不生效。","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
space?: boolean
/**
 * 是否可选中
 * 是否可选中文本，关闭后文本将不支持进行选中，无法进行复制等常见文本操作
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否可选中","description":"是否可选中文本，关闭后文本将不支持进行选中，无法进行复制等常见文本操作","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
userSelect?: boolean
[k: string]: any


          
        }
        

        /**
        * gsd_h5_react_WdForm
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"isDisabledSubmit":{"title":"是否禁用提交","description":"表单是否禁用提交","x-index":5,"x-group":"数据","display":false,"x-runtime-default":false,"type":"boolean","default":false},"formType":{"type":"string","enum":["create","edit","read"],"x-component-props":{"options":[{"text":"新增","value":"create","label":"新增"},{"text":"更新","value":"edit","label":"更新"},{"text":"查看","value":"read","label":"查看"}]},"x-index":10,"title":"表单场景","x-runtime-default":"create","x-props":{"itemClassName":"form-selector"},"x-group":"数据","x-linkages":[{"type":"value:visible","target":"_id","condition":"{{ $form.values.datasourceType === 'model' && ['edit', 'read'].includes($self.value) }}"},{"type":"value:visible","target":"methodCreate","condition":"{{ 'create' === $self.value && ['connector', 'custom-connector'].includes($form.values.datasourceType) }}"},{"type":"value:visible","target":"*(methodGetItem,paramGetItem)","condition":"{{ ['edit', 'read'].includes($self.value) && ['connector', 'custom-connector'].includes($form.values.datasourceType) }}"},{"type":"value:visible","target":"methodUpdate","condition":"{{ 'edit' === $self.value && ['connector', 'custom-connector'].includes($form.values.datasourceType) }}"},{"type":"value:schema","schema":{"x-component-props":{"formType":"{{$self.value}}"}},"target":"*(dataSourceName,fields,methodCreate,methodUpdate,methodGetItem,datasourceType,paramGetItem)"}],"x-component":"FormTypeSelectorComp","default":"create"},"dataSourceName":{"title":"数据模型","default":"","x-index":40,"x-props":{"data-hidebind":true,"itemClassName":"form-datasource-selector"},"x-group":"数据","x-linkages":[{"type":"value:visible","target":"fields","condition":"{{ $self.value && $self.value.length > 0 }}"},{"type":"value:schema","schema":{"x-component-props":{"dataSourceName":"{{$self.value}}"}},"target":"*(methodCreate,methodGetItem,methodUpdate,fields,formType)"}],"x-component":"FormDataSourceSelectorComp","type":"string"},"layout":{"type":"string","enum":["horizontal","vertical"],"x-component-props":{"options":[{"text":"左侧","value":"horizontal","label":"左侧"},{"text":"顶部","value":"vertical","label":"顶部"}]},"x-index":110,"title":"标题位置","x-runtime-default":"horizontal","description":"设置当前容器内表单类组件的标题和输入选择区域为左右布局或上下布局","x-group":"表单布局","default":"horizontal"},"errors":{"title":"错误信息","description":"提交的校验错误信息对象","type":"object","patternProperties":{"^(.*)$":{"type":"array","items":{"type":"object","properties":{"format":{"type":"string"},"message":{"type":"string"}},"required":["message"]}}}},"remoteValue":{"title":"数据源初始值","description":"数据源初始化请求的初始值","type":"object","patternProperties":{"^(.*)$":{}}},"value":{"title":"表单前端值","description":"当前前端表单状态值","x-group":"数据","x-index":48,"type":"object","patternProperties":{"^(.*)$":{}}},"dataSourceProfile":{"title":"数据源类型信息","description":"数据源信息"},"submitParams":{"title":"数据源方法提交入参","description":"数据源方法提交入参, 绑定query的时候没有","type":"object","patternProperties":{"^(.*)$":{}}},"clearValidate":{"title":"清除校验","description":"清除校验","type":"object","instanceOf":"Function","parameters":[],"returns":{"type":"null","typeOf":"Void"}}},"required":["isDisabledSubmit","formType","dataSourceName","layout","errors","remoteValue","value","dataSourceProfile","submitParams","clearValidate"]}}
        */
        declare class gsd_h5_react_WdForm extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 是否禁用提交
 * 表单是否禁用提交
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否禁用提交","description":"表单是否禁用提交","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
isDisabledSubmit: boolean
/**
 * 表单场景
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"表单场景","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
formType: ("create" | "edit" | "read")
/**
 * 数据模型
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"数据模型","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
dataSourceName: string
/**
 * 标题位置
 * 设置当前容器内表单类组件的标题和输入选择区域为左右布局或上下布局
 * @privateForWeDa
 * {"displayType":"string","displayName":"标题位置","description":"设置当前容器内表单类组件的标题和输入选择区域为左右布局或上下布局","schema":null,"dataFieldInfo":{"type":"string"}}
 */
layout: ("horizontal" | "vertical")
/**
 * 错误信息
 * 提交的校验错误信息对象
 * @privateForWeDa
 * {"displayType":"object","displayName":"错误信息","description":"提交的校验错误信息对象","schema":null,"dataFieldInfo":{"type":"object"}}
 */
errors: {
/**
 * ^(.*)$
 * 
 * @privateForWeDa
 * {"displayType":"array","displayName":"","description":"","schema":null,"dataFieldInfo":{"type":"array"}}
 * 
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.*)$".
 */
[k: string]: {
/**
 * format
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
format?: string
/**
 * message
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
message: string
[k: string]: any
}[]
}
/**
 * 数据源初始值
 * 数据源初始化请求的初始值
 * @privateForWeDa
 * {"displayType":"object","displayName":"数据源初始值","description":"数据源初始化请求的初始值","schema":null,"dataFieldInfo":{"type":"object"}}
 */
remoteValue: {
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.*)$".
 */
[k: string]: any
}
/**
 * 表单前端值
 * 当前前端表单状态值
 * @privateForWeDa
 * {"displayType":"object","displayName":"表单前端值","description":"当前前端表单状态值","schema":null,"dataFieldInfo":{"type":"object"}}
 */
value: {
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.*)$".
 */
[k: string]: any
}
/**
 * 数据源信息
 */
dataSourceProfile: {
[k: string]: any
}
/**
 * 数据源方法提交入参
 * 数据源方法提交入参, 绑定query的时候没有
 * @privateForWeDa
 * {"displayType":"object","displayName":"数据源方法提交入参","description":"数据源方法提交入参, 绑定query的时候没有","schema":null,"dataFieldInfo":{"type":"object"}}
 */
submitParams: {
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.*)$".
 */
[k: string]: any
}
/**
 * 清除校验
 * 清除校验
 * @privateForWeDa
 * {"displayType":"object","displayName":"清除校验","description":"清除校验","schema":null,"dataFieldInfo":{"type":"object"}}
 */
clearValidate: {
[k: string]: any
}
[k: string]: any


          
                  /**
                   *
                   */
                  setValue (param: {
/**
 * 表单的值
 */
value: {
[k: string]: any
}
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setValue (/**, * 表单的值, */,value: {,[k: string]: any,},[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  submit (): void
                  
                  

                  /**
                   *
                   */
                  clearValue (param: {
isImmediate: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    clearValue (isImmediate: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  clearValidate (): void
                  
                  

                  /**
                   *
                   */
                  validate (): void
                  
                  

                  /**
                   *
                   */
                  disableSubmit (): void
                  
                  

                  /**
                   *
                   */
                  enableSubmit (): void
                  
                  
        }
        

        /**
        * gsd_h5_react_WdInput
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"name":{"title":"绑定字段","type":"string","required":false,"description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","x-index":10,"x-category":"通用","x-rules":[{"message":"必须以字母开头，仅能输入字母或下划线或数字","pattern":"^[a-zA-Z][0-9a-zA-Z_]*$"}]},"value":{"title":"输入值","type":"string","default":"","x-category":"通用","x-index":20},"label":{"title":"标题内容","type":"string","default":"标题","x-index":11,"x-category":"通用"},"before":{"title":"前缀文字","type":"string","x-runtime-default":"","description":"表单输入框显示前缀文字，表单提交场景下前缀文字会作为表单内容一起提交到数据模型中","x-index":140,"x-category":"输入框","default":""},"after":{"title":"后缀文字","type":"string","x-runtime-default":"","description":"表单输入框显示后缀文字，表单提交场景下后缀文字会作为表单内容一起提交到数据模型中","x-index":145,"x-category":"输入框","default":""},"required":{"title":"必填","type":"boolean","x-runtime-default":false,"x-index":290,"x-category":"状态/校验","x-linkages":[{"type":"value:visible","target":"*(requiredFlag,requiredMsg)","condition":"{{$self.value}}"}],"default":false},"visible":{"title":"是否展示","description":"组件是否展示","x-platforms":[],"type":"boolean"},"disabled":{"title":"是否禁用","description":"组件是否禁用","x-platforms":[],"type":"boolean"},"readOnly":{"title":"是否只读","description":"组件是否只读","x-platforms":[],"type":"boolean"}}}}
        */
        declare class gsd_h5_react_WdInput extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 绑定字段
 * 表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。
 * @privateForWeDa
 * {"displayType":"string","displayName":"绑定字段","description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","schema":null,"dataFieldInfo":{"type":"string"}}
 */
name?: string
/**
 * 输入值
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"输入值","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
value?: string
/**
 * 标题内容
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"标题内容","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
label?: string
/**
 * 前缀文字
 * 表单输入框显示前缀文字，表单提交场景下前缀文字会作为表单内容一起提交到数据模型中
 * @privateForWeDa
 * {"displayType":"string","displayName":"前缀文字","description":"表单输入框显示前缀文字，表单提交场景下前缀文字会作为表单内容一起提交到数据模型中","schema":null,"dataFieldInfo":{"type":"string"}}
 */
before?: string
/**
 * 后缀文字
 * 表单输入框显示后缀文字，表单提交场景下后缀文字会作为表单内容一起提交到数据模型中
 * @privateForWeDa
 * {"displayType":"string","displayName":"后缀文字","description":"表单输入框显示后缀文字，表单提交场景下后缀文字会作为表单内容一起提交到数据模型中","schema":null,"dataFieldInfo":{"type":"string"}}
 */
after?: string
/**
 * 必填
 * 
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"必填","description":"","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
required?: boolean
/**
 * 是否展示
 * 组件是否展示
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否展示","description":"组件是否展示","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
visible?: boolean
/**
 * 是否禁用
 * 组件是否禁用
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否禁用","description":"组件是否禁用","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
disabled?: boolean
/**
 * 是否只读
 * 组件是否只读
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否只读","description":"组件是否只读","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
readOnly?: boolean
[k: string]: any


          
                  /**
                   *
                   */
                  setValue (param: {
value?: string
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setValue (value?: string,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setVisible (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setVisible (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setDisabled (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setDisabled (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  clearValue (): void
                  
                  

                  /**
                   *
                   */
                  setReadOnly (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setReadOnly (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  handleValidate (): void
                  
                  

                  /**
                   *
                   */
                  clearValidate (): void
                  
                  
        }
        

        /**
        * gsd_h5_react_WdInputPhone
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"name":{"title":"绑定字段","type":"string","required":false,"description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","x-index":10,"x-category":"通用","x-rules":[{"message":"必须以字母开头，仅能输入字母或下划线或数字","pattern":"^[a-zA-Z][0-9a-zA-Z_]*$"}]},"value":{"title":"输入值","type":"string","default":"","x-category":"通用","x-index":20},"label":{"title":"标题内容","type":"string","default":"标题","x-index":11,"x-category":"通用"},"before":{"title":"前缀文字","type":"string","x-runtime-default":"","description":"表单输入框显示前缀文字，表单提交场景下前缀文字会作为表单内容一起提交到数据模型中","x-index":140,"x-category":"输入框","default":""},"after":{"title":"后缀文字","type":"string","x-runtime-default":"","description":"表单输入框显示后缀文字，表单提交场景下后缀文字会作为表单内容一起提交到数据模型中","x-index":145,"x-category":"输入框","default":""},"required":{"title":"必填","type":"boolean","x-runtime-default":false,"x-index":290,"x-category":"状态/校验","x-linkages":[{"type":"value:visible","target":"*(requiredFlag,requiredMsg)","condition":"{{$self.value}}"}],"default":false},"visible":{"title":"是否展示","description":"组件是否展示","x-platforms":[],"type":"boolean"},"disabled":{"title":"是否禁用","description":"组件是否禁用","x-platforms":[],"type":"boolean"},"readOnly":{"title":"是否只读","description":"组件是否只读","x-platforms":[],"type":"boolean"}}}}
        */
        declare class gsd_h5_react_WdInputPhone extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 绑定字段
 * 表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。
 * @privateForWeDa
 * {"displayType":"string","displayName":"绑定字段","description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","schema":null,"dataFieldInfo":{"type":"string"}}
 */
name?: string
/**
 * 输入值
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"输入值","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
value?: string
/**
 * 标题内容
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"标题内容","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
label?: string
/**
 * 前缀文字
 * 表单输入框显示前缀文字，表单提交场景下前缀文字会作为表单内容一起提交到数据模型中
 * @privateForWeDa
 * {"displayType":"string","displayName":"前缀文字","description":"表单输入框显示前缀文字，表单提交场景下前缀文字会作为表单内容一起提交到数据模型中","schema":null,"dataFieldInfo":{"type":"string"}}
 */
before?: string
/**
 * 后缀文字
 * 表单输入框显示后缀文字，表单提交场景下后缀文字会作为表单内容一起提交到数据模型中
 * @privateForWeDa
 * {"displayType":"string","displayName":"后缀文字","description":"表单输入框显示后缀文字，表单提交场景下后缀文字会作为表单内容一起提交到数据模型中","schema":null,"dataFieldInfo":{"type":"string"}}
 */
after?: string
/**
 * 必填
 * 
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"必填","description":"","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
required?: boolean
/**
 * 是否展示
 * 组件是否展示
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否展示","description":"组件是否展示","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
visible?: boolean
/**
 * 是否禁用
 * 组件是否禁用
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否禁用","description":"组件是否禁用","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
disabled?: boolean
/**
 * 是否只读
 * 组件是否只读
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否只读","description":"组件是否只读","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
readOnly?: boolean
[k: string]: any


          
                  /**
                   *
                   */
                  setValue (param: {
value?: string
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setValue (value?: string,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setVisible (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setVisible (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setDisabled (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setDisabled (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  clearValue (): void
                  
                  

                  /**
                   *
                   */
                  setReadOnly (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setReadOnly (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  handleValidate (): void
                  
                  

                  /**
                   *
                   */
                  clearValidate (): void
                  
                  
        }
        

        /**
        * gsd_h5_react_WdTextarea
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"name":{"title":"绑定字段","type":"string","required":false,"description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","x-index":10,"x-category":"通用","x-rules":[{"message":"必须以字母开头，仅能输入字母或下划线或数字","pattern":"^[a-zA-Z][0-9a-zA-Z_]*$"}]},"value":{"title":"输入值","type":"string","default":"","x-category":"通用","x-index":20},"label":{"title":"标题内容","type":"string","default":"标题","x-index":11,"x-category":"通用"},"required":{"title":"必填","type":"boolean","x-runtime-default":false,"x-index":290,"x-category":"状态/校验","x-linkages":[{"type":"value:visible","target":"*(requiredFlag,requiredMsg)","condition":"{{$self.value}}"}],"default":false},"visible":{"title":"是否展示","description":"组件是否展示","x-platforms":[],"type":"boolean"},"disabled":{"title":"是否禁用","description":"组件是否禁用","x-platforms":[],"type":"boolean"},"readOnly":{"title":"是否只读","description":"组件是否只读","x-platforms":[],"type":"boolean"}}}}
        */
        declare class gsd_h5_react_WdTextarea extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 绑定字段
 * 表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。
 * @privateForWeDa
 * {"displayType":"string","displayName":"绑定字段","description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","schema":null,"dataFieldInfo":{"type":"string"}}
 */
name?: string
/**
 * 输入值
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"输入值","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
value?: string
/**
 * 标题内容
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"标题内容","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
label?: string
/**
 * 必填
 * 
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"必填","description":"","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
required?: boolean
/**
 * 是否展示
 * 组件是否展示
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否展示","description":"组件是否展示","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
visible?: boolean
/**
 * 是否禁用
 * 组件是否禁用
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否禁用","description":"组件是否禁用","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
disabled?: boolean
/**
 * 是否只读
 * 组件是否只读
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否只读","description":"组件是否只读","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
readOnly?: boolean
[k: string]: any


          
                  /**
                   *
                   */
                  setValue (param: {
value?: string
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setValue (value?: string,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setVisible (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setVisible (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setDisabled (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setDisabled (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  clearValue (): void
                  
                  

                  /**
                   *
                   */
                  setReadOnly (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setReadOnly (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  handleValidate (): void
                  
                  

                  /**
                   *
                   */
                  clearValidate (): void
                  
                  
        }
        

        /**
        * gsd_h5_react_WdSelect
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"name":{"title":"绑定字段","type":"string","required":false,"description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","x-index":1,"x-category":"通用","x-rules":[{"message":"必须以字母开头，仅能输入字母或下划线或数字","pattern":"^[a-zA-Z][0-9a-zA-Z_]*$"}]},"value":{"title":"选中值","type":"string","default":"","x-category":"通用","x-index":18},"label":{"title":"标题内容","type":"string","default":"下拉单选","x-index":11,"x-category":"通用"},"required":{"title":"必填","type":"boolean","x-runtime-default":false,"x-index":290,"x-category":"状态/校验","x-linkages":[{"type":"value:visible","target":"*(requiredFlag,requiredMsg)","condition":"{{$self.value}}"}],"default":false},"visible":{"title":"是否展示","description":"组件是否展示","x-platforms":[],"type":"boolean"},"disabled":{"title":"是否禁用","description":"组件是否禁用","x-platforms":[],"type":"boolean"},"readOnly":{"title":"是否只读","description":"组件是否只读","x-platforms":[],"type":"boolean"},"selectedLabel":{"title":"选中项名称","description":"选中项对应的文本名称","x-platforms":[],"type":"string"},"item":{"title":"选中项","description":"选中项对应的对象","x-platforms":[],"type":"object","properties":{"label":{"title":"label","type":"string"},"value":{"title":"value","type":"string"}},"required":["label","value"]}}}}
        */
        declare class gsd_h5_react_WdSelect extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 绑定字段
 * 表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。
 * @privateForWeDa
 * {"displayType":"string","displayName":"绑定字段","description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","schema":null,"dataFieldInfo":{"type":"string"}}
 */
name?: string
/**
 * 选中值
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"选中值","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
value?: string
/**
 * 标题内容
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"标题内容","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
label?: string
/**
 * 必填
 * 
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"必填","description":"","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
required?: boolean
/**
 * 是否展示
 * 组件是否展示
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否展示","description":"组件是否展示","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
visible?: boolean
/**
 * 是否禁用
 * 组件是否禁用
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否禁用","description":"组件是否禁用","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
disabled?: boolean
/**
 * 是否只读
 * 组件是否只读
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否只读","description":"组件是否只读","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
readOnly?: boolean
/**
 * 选中项名称
 * 选中项对应的文本名称
 * @privateForWeDa
 * {"displayType":"string","displayName":"选中项名称","description":"选中项对应的文本名称","schema":null,"dataFieldInfo":{"type":"string"}}
 */
selectedLabel?: string
/**
 * 选中项
 * 选中项对应的对象
 * @privateForWeDa
 * {"displayType":"object","displayName":"选中项","description":"选中项对应的对象","schema":null,"dataFieldInfo":{"type":"object"}}
 */
item?: {
/**
 * label
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"label","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
label: string
/**
 * value
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"value","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
value: string
[k: string]: any
}
[k: string]: any


          
                  /**
                   *
                   */
                  setValue (param: {
value?: string
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setValue (value?: string,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setVisible (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setVisible (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setDisabled (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setDisabled (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  clearValue (): void
                  
                  

                  /**
                   *
                   */
                  setReadOnly (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setReadOnly (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  handleValidate (): void
                  
                  

                  /**
                   *
                   */
                  clearValidate (): void
                  
                  
        }
        

        /**
        * gsd_h5_react_WdUploadImage
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"name":{"title":"绑定字段","type":"string","required":false,"description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","x-index":10,"x-category":"通用","x-rules":[{"message":"必须以字母开头，仅能输入字母或下划线或数字","pattern":"^[a-zA-Z][0-9a-zA-Z_]*$"}]},"value":{"type":"array","title":"图片值","description":"支持以数组格式写入文件的https地址或cloudID；上传单个时支持字符串类型，上传多个时支持数组类型","x-category":"通用","x-index":20,"x-component":"jsontext","items":{"type":"string"}},"label":{"title":"标题内容","type":"string","default":"图片上传","x-index":11,"x-category":"通用"},"required":{"title":"必填","type":"boolean","x-runtime-default":false,"x-index":290,"x-category":"状态/校验","x-linkages":[{"type":"value:visible","target":"*(requiredFlag,requiredMsg)","condition":"{{$self.value}}"}],"default":false},"visible":{"title":"是否展示","description":"组件是否展示","x-platforms":[],"type":"boolean"},"disabled":{"title":"是否禁用","description":"组件是否禁用","x-platforms":[],"type":"boolean"},"readOnly":{"title":"是否只读","description":"组件是否只读","x-platforms":[],"type":"boolean"},"uploadInstance":{"title":"图片上传实例","type":"object","properties":{"config":{"title":"图片上传配置项","type":"object","properties":{"accepts":{"title":"允许上传的图片类型，仅支持web端","type":"string"},"customUploadPath":{"title":"自定义上传路径，格式：pathA/pathB，存储在weda-uploader/appName/customUploadPath,customUploadPath默认为空","type":"string"},"action":{"title":"小程序上传api","description":"可选值为chooseMedia,chooseMessageFile,仅小程序端生效","default":"chooseMedia","type":"string"},"isCompressBeforeUpload":{"title":"上传前压缩图片","x-runtime-default":false,"x-category":"图片内容","x-index":267,"x-helper-text":"iOS小程序端仅支持压缩JPG格式图片","x-props":{"data-hidebind":true},"x-linkages":[{"type":"value:visible","target":"*(compressQuality,compressedWidth,compressedHeight)","condition":"{{$self.value === true}}"}],"type":"boolean","default":false},"compressQuality":{"maximum":100,"title":"压缩质量","x-runtime-default":70,"x-category":"图片内容","x-index":268,"x-helper-text":"该属性仅对JPG格式图片有效，范围0~100，数值越小，质量越低，压缩率越高","type":"number","default":70},"compressedWidth":{"title":"压缩后图片宽度（px）","x-index":269,"x-category":"图片内容","x-helper-text":"若为空则以「压缩后图片高度」为准等比缩放；两个属性均为空时，保持图片原尺寸","type":"number"},"compressedHeight":{"title":"压缩后图片高度（px）","x-index":270,"x-category":"图片内容","x-helper-text":"若为空则以「压缩后图片宽度」为准等比缩放；两个属性均为空时，保持图片原尺寸","type":"number"},"maxSize":{"type":"number","title":"单张图片大小上限(M)","description":"单张图片大小上限","x-runtime-default":10,"x-category":"状态/校验","x-index":273,"default":10},"maxUploadCount":{"type":"number","title":"图片数量上限","description":"允许上传的最大数量","x-runtime-default":9,"x-category":"状态/校验","x-index":275,"default":9}}},"beforeUpload":{"title":"上传前处理函数","required":false,"type":"object","instanceOf":"Function","parameters":[{"type":"object","properties":{"files":{"type":"array","items":{"title":"file 对象","x-platforms":["WEB","MOBILEWEB","PCWEB"]}},"base64Uri":{"x-platforms":["WEB","MOBILEWEB","PCWEB"],"type":"array","items":{"title":"base64","type":"string"}},"tmpFilePaths":{"x-platforms":["MP"],"type":"array","items":{"title":"图片临时地址","type":"string"}}}}],"returns":{}},"onUploadProgress":{"title":"上传过程中","type":"object","instanceOf":"Function","parameters":[{"title":"上传图片预览信息","type":"object","properties":{"progress":{"title":"加载进度条","type":"number"},"loading":{"title":"是否loading","type":"boolean"},"cloudId":{"title":"云存储id","type":"string"},"url":{"title":"图片https地址","type":"string"},"tempUrl":{"title":"临时图片地址","type":"string"},"key":{"title":"key","type":"string"},"file":{"title":"web端图片对象"}}}],"returns":{}},"onComplete":{"title":"上传事件完成","required":false,"type":"object","instanceOf":"Function","parameters":[{"title":"上传图片预览列表","type":"array","items":{"title":"上传图片预览信息","type":"object","properties":{"progress":{"title":"加载进度条","type":"number"},"loading":{"title":"是否loading","type":"boolean"},"cloudId":{"title":"云存储id","type":"string"},"url":{"title":"图片https地址","type":"string"},"tempUrl":{"title":"临时图片地址","type":"string"},"key":{"title":"key","type":"string"},"file":{"title":"web端图片对象"}}}}],"returns":{}},"onSuccess":{"title":"上传成功","type":"object","instanceOf":"Function","parameters":[{"title":"上传图片预览信息","type":"object","properties":{"progress":{"title":"加载进度条","type":"number"},"loading":{"title":"是否loading","type":"boolean"},"cloudId":{"title":"云存储id","type":"string"},"url":{"title":"图片https地址","type":"string"},"tempUrl":{"title":"临时图片地址","type":"string"},"key":{"title":"key","type":"string"},"file":{"title":"web端图片对象"}}}],"returns":{}},"onFail":{"title":"上传失败","type":"object","instanceOf":"Function","parameters":[{}],"returns":{}}}},"previewFile":{"title":"图片预览列表","type":"array","items":{"title":"上传图片预览信息","type":"object","properties":{"progress":{"title":"加载进度条","type":"number"},"loading":{"title":"是否loading","type":"boolean"},"cloudId":{"title":"云存储id","type":"string"},"url":{"title":"图片https地址","type":"string"},"tempUrl":{"title":"临时图片地址","type":"string"},"key":{"title":"key","type":"string"},"file":{"title":"web端图片对象"}}}}},"required":["uploadInstance","previewFile"]}}
        */
        declare class gsd_h5_react_WdUploadImage extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 绑定字段
 * 表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。
 * @privateForWeDa
 * {"displayType":"string","displayName":"绑定字段","description":"表单字段的Key值，用于提交数据时，匹配数据模型字段标识。表单内需保证唯一。","schema":null,"dataFieldInfo":{"type":"string"}}
 */
name?: string
/**
 * 图片值
 * 支持以数组格式写入文件的https地址或cloudID；上传单个时支持字符串类型，上传多个时支持数组类型
 * @privateForWeDa
 * {"displayType":"array","displayName":"图片值","description":"支持以数组格式写入文件的https地址或cloudID；上传单个时支持字符串类型，上传多个时支持数组类型","schema":null,"dataFieldInfo":{"type":"array"}}
 */
value?: string[]
/**
 * 标题内容
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"标题内容","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
label?: string
/**
 * 必填
 * 
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"必填","description":"","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
required?: boolean
/**
 * 是否展示
 * 组件是否展示
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否展示","description":"组件是否展示","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
visible?: boolean
/**
 * 是否禁用
 * 组件是否禁用
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否禁用","description":"组件是否禁用","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
disabled?: boolean
/**
 * 是否只读
 * 组件是否只读
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否只读","description":"组件是否只读","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
readOnly?: boolean
/**
 * 图片上传实例
 * 
 * @privateForWeDa
 * {"displayType":"object","displayName":"图片上传实例","description":"","schema":null,"dataFieldInfo":{"type":"object"}}
 */
uploadInstance: {
/**
 * 图片上传配置项
 * 
 * @privateForWeDa
 * {"displayType":"object","displayName":"图片上传配置项","description":"","schema":null,"dataFieldInfo":{"type":"object"}}
 */
config?: {
/**
 * 允许上传的图片类型，仅支持web端
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"允许上传的图片类型，仅支持web端","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
accepts?: string
/**
 * 自定义上传路径，格式：pathA/pathB，存储在weda-uploader/appName/customUploadPath,customUploadPath默认为空
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"自定义上传路径，格式：pathA/pathB，存储在weda-uploader/appName/customUploadPath,customUploadPath默认为空","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
customUploadPath?: string
/**
 * 小程序上传api
 * 可选值为chooseMedia,chooseMessageFile,仅小程序端生效
 * @privateForWeDa
 * {"displayType":"string","displayName":"小程序上传api","description":"可选值为chooseMedia,chooseMessageFile,仅小程序端生效","schema":null,"dataFieldInfo":{"type":"string"}}
 */
action?: string
/**
 * 上传前压缩图片
 * 
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"上传前压缩图片","description":"","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
isCompressBeforeUpload?: boolean
/**
 * 压缩质量
 * 
 * @privateForWeDa
 * {"displayType":"number","displayName":"压缩质量","description":"","schema":null,"dataFieldInfo":{"type":"number"}}
 */
compressQuality?: number
/**
 * 压缩后图片宽度（px）
 * 
 * @privateForWeDa
 * {"displayType":"number","displayName":"压缩后图片宽度（px）","description":"","schema":null,"dataFieldInfo":{"type":"number"}}
 */
compressedWidth?: number
/**
 * 压缩后图片高度（px）
 * 
 * @privateForWeDa
 * {"displayType":"number","displayName":"压缩后图片高度（px）","description":"","schema":null,"dataFieldInfo":{"type":"number"}}
 */
compressedHeight?: number
/**
 * 单张图片大小上限(M)
 * 单张图片大小上限
 * @privateForWeDa
 * {"displayType":"number","displayName":"单张图片大小上限(M)","description":"单张图片大小上限","schema":null,"dataFieldInfo":{"type":"number"}}
 */
maxSize?: number
/**
 * 图片数量上限
 * 允许上传的最大数量
 * @privateForWeDa
 * {"displayType":"number","displayName":"图片数量上限","description":"允许上传的最大数量","schema":null,"dataFieldInfo":{"type":"number"}}
 */
maxUploadCount?: number
[k: string]: any
}
/**
 * 上传前处理函数
 * 
 * @privateForWeDa
 * {"displayType":"object","displayName":"上传前处理函数","description":"","schema":null,"dataFieldInfo":{"type":"object"}}
 */
beforeUpload?: {
[k: string]: any
}
/**
 * 上传过程中
 * 
 * @privateForWeDa
 * {"displayType":"object","displayName":"上传过程中","description":"","schema":null,"dataFieldInfo":{"type":"object"}}
 */
onUploadProgress?: {
[k: string]: any
}
/**
 * 上传事件完成
 * 
 * @privateForWeDa
 * {"displayType":"object","displayName":"上传事件完成","description":"","schema":null,"dataFieldInfo":{"type":"object"}}
 */
onComplete?: {
[k: string]: any
}
/**
 * 上传成功
 * 
 * @privateForWeDa
 * {"displayType":"object","displayName":"上传成功","description":"","schema":null,"dataFieldInfo":{"type":"object"}}
 */
onSuccess?: {
[k: string]: any
}
/**
 * 上传失败
 * 
 * @privateForWeDa
 * {"displayType":"object","displayName":"上传失败","description":"","schema":null,"dataFieldInfo":{"type":"object"}}
 */
onFail?: {
[k: string]: any
}
[k: string]: any
}
/**
 * 图片预览列表
 * 
 * @privateForWeDa
 * {"displayType":"array","displayName":"图片预览列表","description":"","schema":null,"dataFieldInfo":{"type":"array"}}
 */
previewFile: {
/**
 * 加载进度条
 * 
 * @privateForWeDa
 * {"displayType":"number","displayName":"加载进度条","description":"","schema":null,"dataFieldInfo":{"type":"number"}}
 */
progress?: number
/**
 * 是否loading
 * 
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否loading","description":"","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
loading?: boolean
/**
 * 云存储id
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"云存储id","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
cloudId?: string
/**
 * 图片https地址
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"图片https地址","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
url?: string
/**
 * 临时图片地址
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"临时图片地址","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
tempUrl?: string
/**
 * key
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"key","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
key?: string
file?: {
[k: string]: any
}
[k: string]: any
}[]
[k: string]: any


          
                  /**
                   *
                   */
                  setValue (param: {
value: {
[k: string]: any
}
isDelete?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setValue (value: {,[k: string]: any,},isDelete?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setVisible (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setVisible (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setDisabled (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setDisabled (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  clearValue (): void
                  
                  

                  /**
                   *
                   */
                  setReadOnly (param: {
value?: boolean
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setReadOnly (value?: boolean,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  handleValidate (): void
                  
                  

                  /**
                   *
                   */
                  clearValidate (): void
                  
                  

                  /**
                   *
                   */
                  upload (): void
                  
                  

                  /**
                   *
                   */
                  delete (param: {
cloudId?: string
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    delete (cloudId?: string,[k: string]: any): void
                    
                  

                  /**
                   *
                   */
                  setConfig (param: {
config: {
accepts?: string
customUploadPath?: string
/**
 * 可选值为chooseMedia,chooseMessageFile,仅小程序端生效
 */
action?: string
isCompressBeforeUpload?: boolean
compressQuality?: number
compressedWidth?: number
compressedHeight?: number
/**
 * 单张图片大小上限
 */
maxSize?: number
/**
 * 允许上传的最大数量
 */
maxUploadCount?: number
[k: string]: any
}
[k: string]: any
}): void
                  
                    /**
                     *
                     */
                    setConfig (config: {,accepts?: string,customUploadPath?: string,/**, * 可选值为chooseMedia,chooseMessageFile,仅小程序端生效, */,action?: string,isCompressBeforeUpload?: boolean,compressQuality?: number,compressedWidth?: number,compressedHeight?: number,/**, * 单张图片大小上限, */,maxSize?: number,/**, * 允许上传的最大数量, */,maxUploadCount?: number,[k: string]: any,},[k: string]: any): void
                    
                  
        }
        

        /**
        * gsd_h5_react_WdButton
* 
* @privateForWeDa
* {"displayName":"","description":"","schema":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID","describe":"组件 ID，微搭中一般由编辑器生成"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"text":{"title":"内容","default":"按钮","type":"string","description":"设置按钮的文本内容","x-category":"基础属性","x-index":10},"theme":{"type":"string","enum":["primary","secondary","warning","error"],"x-component-props":{"options":[{"text":"品牌色","value":"primary","label":"品牌色"},{"text":"中性色","value":"secondary","label":"中性色"},{"text":"警告色","value":"warning","label":"警告色"},{"text":"错误色","value":"error","label":"错误色"}]},"x-index":20,"title":"颜色","x-runtime-default":"primary","x-category":"基础属性","description":"设置按钮的颜色","default":"primary"},"variant":{"type":"string","enum":["base","outline","text","link"],"x-component-props":{"options":[{"text":"填充","value":"base","label":"填充"},{"text":"描边","value":"outline","label":"描边"},{"text":"文字","value":"text","label":"文字"},{"text":"链接","value":"link","label":"链接"}]},"x-index":30,"title":"类型","x-runtime-default":"base","description":"设置按钮的类型","x-category":"基础属性","default":"base"},"size":{"type":"string","enum":["sm","md","lg"],"x-component-props":{"options":[{"text":"小","value":"sm","label":"小"},{"text":"中","value":"md","label":"中"},{"text":"大","value":"lg","label":"大"}]},"x-index":40,"title":"尺寸","x-runtime-default":"md","x-category":"基础属性","description":"设置按钮的尺寸大小","default":"md"},"block":{"title":"是否通栏","x-runtime-default":false,"x-category":"基础属性","x-index":50,"description":"开启后按钮将撑满父容器","type":"boolean","default":false},"disabled":{"type":"boolean","title":"是否禁用","x-runtime-default":false,"description":"开启后按钮将无法进行点击","x-category":"高级属性","x-index":120,"default":false},"formType":{"type":"string","enum":["button","submit","reset"],"x-component-props":{"options":[{"text":"按钮","value":"button","label":"按钮"},{"text":"提交","value":"submit","label":"提交"},{"text":"重置","value":"reset","label":"重置"}]},"x-index":130,"title":"表单类型","x-runtime-default":"button","x-helper-text":" 按钮: 适用于常见的按钮点击使用场景；[重置、提交: 需配合表单容器组件使用，不触发点击事件](https://docs.cloudbase.net/lowcode/components/wedaUI/src/docs/compsdocs/show/WdButton#%E8%A1%A8%E5%8D%95%E4%B8%AD%E7%9A%84%E6%8C%89%E9%92%AE%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)","description":" 按钮： 适用于常见的按钮点击使用场景，可在事件配置区中对按钮组件配置点击事件并触发相应的执行动作；重置： 需配合表单容器组件使用，将按钮放置在表单容器中，点击后即可重置表单容器中表单组件的输入信息；提交：需配合表单容器组件使用，将按钮放置在表单容器中，点击后即可对表单容器中的数据进行提交","x-category":"高级属性","x-linkages":[{"condition":"{{ $self.value === 'submit' && setComponentConfigEvents({targetSourceKey: 'gsd-h5-react:wdform', type: $self.value, des:'当前按钮的表单类型为提交，点击时将自动执行父级表单容器的提交事件'})}}"},{"condition":"{{ $self.value === 'reset' && setComponentConfigEvents({targetSourceKey: 'gsd-h5-react:wdform', type:$self.value, des: '当前按钮的表单类型为重置，点击时将重置清空父级表单容器中的表单数据'})}}"},{"condition":"{{ $self.value === 'button' && setComponentConfigEvents({targetSourceKey: 'gsd-h5-react:wdform', type:$self.value})}}"}],"default":"button"},"openType":{"type":"string","enum":["","contact","share","launchApp","openSetting","feedback"],"x-component-props":{"options":[{"text":"无","value":"","label":"无"},{"text":"打开客服会话","value":"contact","label":"打开客服会话"},{"text":"转发","value":"share","label":"转发"},{"text":"打开App","value":"launchApp","label":"打开App"},{"text":"打开授权设置","value":"openSetting","label":"打开授权设置"},{"text":"打开意见反馈","value":"feedback","label":"打开意见反馈"}]},"x-index":140,"title":"微信开放能力","x-linkages":[{"type":"value:visible","target":"*(sessionFrom,sendMessageTitle,sendMessageImg,sendMessagePath,showMessageCard)","condition":"{{ $self.value === 'contact' }}"},{"type":"value:visible","target":"appParameter","condition":"{{ $self.value === 'launchApp' }}"},{"type":"value:visible","target":"categoryId","condition":"{{ $self.value === 'getRealnameAuthInfo' }}"}],"x-platforms":["MP"],"description":"仅支持在小程序构建时使用，为按钮配置小程序能力相关的各项按钮属性，用于相关微信能力的调用","x-category":"高级属性"}}}}
        */
        declare class gsd_h5_react_WdButton extends UserWidget {

          
/**
 * 组件 ID
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件 ID","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
id?: string
/**
 * 组件库名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件库名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
module?: string
/**
 * 组件名
 * 
 * @privateForWeDa
 * {"displayType":"string","displayName":"组件名","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
component?: string
/**
 * 内容
 * 设置按钮的文本内容
 * @privateForWeDa
 * {"displayType":"string","displayName":"内容","description":"设置按钮的文本内容","schema":null,"dataFieldInfo":{"type":"string"}}
 */
text?: string
/**
 * 颜色
 * 设置按钮的颜色
 * @privateForWeDa
 * {"displayType":"string","displayName":"颜色","description":"设置按钮的颜色","schema":null,"dataFieldInfo":{"type":"string"}}
 */
theme?: ("primary" | "secondary" | "warning" | "error")
/**
 * 类型
 * 设置按钮的类型
 * @privateForWeDa
 * {"displayType":"string","displayName":"类型","description":"设置按钮的类型","schema":null,"dataFieldInfo":{"type":"string"}}
 */
variant?: ("base" | "outline" | "text" | "link")
/**
 * 尺寸
 * 设置按钮的尺寸大小
 * @privateForWeDa
 * {"displayType":"string","displayName":"尺寸","description":"设置按钮的尺寸大小","schema":null,"dataFieldInfo":{"type":"string"}}
 */
size?: ("sm" | "md" | "lg")
/**
 * 是否通栏
 * 开启后按钮将撑满父容器
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否通栏","description":"开启后按钮将撑满父容器","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
block?: boolean
/**
 * 是否禁用
 * 开启后按钮将无法进行点击
 * @privateForWeDa
 * {"displayType":"boolean","displayName":"是否禁用","description":"开启后按钮将无法进行点击","schema":null,"dataFieldInfo":{"type":"boolean"}}
 */
disabled?: boolean
/**
 * 表单类型
 *  按钮： 适用于常见的按钮点击使用场景，可在事件配置区中对按钮组件配置点击事件并触发相应的执行动作；重置： 需配合表单容器组件使用，将按钮放置在表单容器中，点击后即可重置表单容器中表单组件的输入信息；提交：需配合表单容器组件使用，将按钮放置在表单容器中，点击后即可对表单容器中的数据进行提交
 * @privateForWeDa
 * {"displayType":"string","displayName":"表单类型","description":" 按钮： 适用于常见的按钮点击使用场景，可在事件配置区中对按钮组件配置点击事件并触发相应的执行动作；重置： 需配合表单容器组件使用，将按钮放置在表单容器中，点击后即可重置表单容器中表单组件的输入信息；提交：需配合表单容器组件使用，将按钮放置在表单容器中，点击后即可对表单容器中的数据进行提交","schema":null,"dataFieldInfo":{"type":"string"}}
 */
formType?: ("button" | "submit" | "reset")
/**
 * 微信开放能力
 * 仅支持在小程序构建时使用，为按钮配置小程序能力相关的各项按钮属性，用于相关微信能力的调用
 * @privateForWeDa
 * {"displayType":"string","displayName":"微信开放能力","description":"仅支持在小程序构建时使用，为按钮配置小程序能力相关的各项按钮属性，用于相关微信能力的调用","schema":null,"dataFieldInfo":{"type":"string"}}
 */
openType?: ("" | "contact" | "share" | "launchApp" | "openSetting" | "feedback")
[k: string]: any


          
        }
        
// Used Components Inner End

// Redefine Any Type Inner Begin

[k: string]: any

// Redefine Any Type Inner End

declare namespace $app {
  /**
 * 应用 ID
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "应用 ID"}
 */
const id: string;
/**
 * 应用名称
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "应用名称"}
 */
const label: string;
/**
 * 应用版本
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "应用版本"}
 */
const version: string;
/**
 * 小程序APPID
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "小程序APPID"}
 */
const mpAppId: string;
/**
 * 小程序名称
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "小程序名称"}
 */
const mpAppName: string;

namespace dataset {

  /**
   * 全局变量对象
   */
  const state: {
    // Global State Inner Begin
    
/**
 * actualRole
 * 真实身份
 * @privateForWeDa
 * {"group":"globalVar","displayType":"string","displayName":"","description":"真实身份","schema":null,"dataFieldInfo":{"type":"string"}}
 */
actualRole?: string
/**
 * currentView
 * (当前视图)：存用户当前想看的界面（client, workbench）
 * @privateForWeDa
 * {"group":"globalVar","displayType":"string","displayName":"","description":"(当前视图)：存用户当前想看的界面（client, workbench）","schema":null,"dataFieldInfo":{"type":"string"}}
 */
currentView?: string
/**
 * myEmployeeId
 * 
 * @privateForWeDa
 * {"group":"globalVar","displayType":"string","displayName":"","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
myEmployeeId?: string
[k: string]: any

// Global State 全局变量 - Don't touch me
    // Global State Inner End
  };
}

/**
 * 全局 common 方法
 */
namespace common {
  // Global Common Inner Begin
  
[k: string]: any

// Global Common 全局方法 - Don't touch me
  // Global Common Inner End
}

/**
 * 已废弃，请改用 $w.utils
 */
const utils: any

/**
 * 设置页面变量
 */
function setState(data: Object): void;

}

declare const app = $app;

declare namespace __w__ {
  /**
   * 当前应用实例
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "object", "displayName": "应用信息", "schema": {"type":"object","properties":{"id":{"type":"string","title":"应用 ID"},"label":{"type":"string","title":"应用名称"},"version":{"type":"string","title":"应用版本"},"mpAppName":{"type":"string","title":"小程序名称"},"mpAppId":{"type":"string","title":"小程序APPID"}}}}
   */
  const app = $app;

  // Widget Page Begin
  /**
   * 当前页面信息
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "object", "displayName": "当前页面信息", "schema": {"type":"object","properties":{"id":{"type":"string","title":"页面 ID"},"label":{"type":"string","title":"页面名称"},"path":{"type":"string","title":"页面路径"}}}}
   */
  const page = $page;
  // Widget Page End

  /**
   * 用户权限相关方法和属性
   */
  namespace auth {
    interface CurrentUserInfo {
  /**
   * 用户 ID
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "用户 ID"}
   */
  userId?: string;
  /**
   * 手机
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "手机"}
   */
  phone?: string;
  /**
   * 用户类型
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "number", "displayName": "用户类型"}
   */
  type?: number;
  /**
   * 用户关联角色
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "array", "displayName": "用户关联角色"}
   */
  relatedRoles?: {
    /**
     * 角色 ID
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "角色 ID"}
     */
    id?: string;
    /**
     * 环境 ID
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "环境 ID"}
     */
    envId?: string;
    /**
     * 角色名称
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "角色名称"}
     */
    name?: string;
    /**
     * 角色标识
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "角色标识"}
     */
    roleIdentity?: string;
  }[];
  /**
   * 微信 openId
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "微信 openId"}
   */
  openId?: string;
  /**
   * 用户名称
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "用户名称"}
   */
  name?: string;
  /**
   * 用户昵称
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "用户昵称"}
   */
  nickName?: string;
  /**
   * 用户头像
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "用户头像"}
   */
  avatarUrl?: string;
  /**
   * 邮箱
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "邮箱"}
   */
  email?: string;
  /**
   * 主岗部门
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "object", "displayName": "主岗部门"}
   */
  mainOrg?: {
    /**
     * 主岗部门 ID
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "主岗部门 ID"}
     */
    id?: string;
    /**
     * 主岗部门名称
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "主岗部门名称"}
     */
    name?: string;
  };
  /**
   * 兼岗部门
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "object", "displayName": "兼岗部门"}
   */
  orgs?: {
    /**
     * 兼岗部门 ID
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "兼岗部门 ID"}
     */
    id?: string;
    /**
     * 兼岗部门名称
     *
     * @privateForWeDa
     * {"group": "sysVar", "displayType": "string", "displayName": "兼岗部门名称"}
     */
    name?: string;
  }[];
  /**
   * 用户登录类型
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "用户登录类型"}
   */
  userType?: string;
  /**
   * 用户描述
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "string", "displayName": "用户描述"}
   */
  userDesc?: string;
}

/**
 * 获取用户信息
 */
function getUserInfo(): CurrentUserInfo;

/**
 *
 * 登录用户信息
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "object", "displayName": "登录用户信息", "schema": {"type":"object","properties":{"userId":{"type":"string","title":"用户 ID"},"phone":{"type":"string","title":"手机"},"type":{"type":"number","title":"用户类型"},"relatedRoles":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","title":"角色 ID"},"envId":{"type":"string","title":"环境 ID"},"name":{"type":"string","title":"角色名称"},"roleIdentity":{"type":"string","title":"角色标识"}}},"title":"用户关联角色"},"openId":{"type":"string","title":"微信 openId"},"name":{"type":"string","title":"用户名称"},"nickName":{"type":"string","title":"用户昵称"},"avatarUrl":{"type":"string","title":"用户头像"},"email":{"type":"string","title":"邮箱"},"mainOrg":{"type":"object","properties":{"id":{"type":"string","title":"主岗部门 ID"},"name":{"type":"string","title":"主岗部门名称"}},"title":"主岗部门"},"orgs":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","title":"兼岗部门 ID"},"name":{"type":"string","title":"兼岗部门名称"}}},"title":"兼岗部门"},"userType":{"type":"string","title":"用户登录类型"},"userDesc":{"type":"string","title":"用户描述"}}}, "doc": "https://docs.cloudbase.net/lowcode/framework/app/app#authgetuserinfoauthcurrentuser"}
 */
const currentUser: CurrentUserInfo;

  }

  /**
   * 数据源等云端能力集合
   */
  namespace cloud {
    interface ICallDataSourceParams {
  /**
   * 数据源标志
   */
  dataSourceName: string;
  /**
   * 数据源方法名
   */
  methodName: string;
  /**
   * 方法参数，根据方法实际入参填写
   */
  params: Object;
}
interface ICallFunctionParams {
  /**
   * TCB云函数名称
   */
  name: string;
  /**
   * 云函数接收的参数，根据自己创建的云函数入参而定
   */
  data?: any;
}
interface IParseOptions {
  /**
   * 解析 云开发云函数的通用response 包装。为true, 则返回 res.result, 此时会丢失 res.requestId 信息
   */
  unwrapResult?: boolean;
  /**
   * 解析业务信息，需配合 unwrapResult 使用。为 true 时, res.result.code 非 0 抛出错误, 为 0 则返回 res.result.data
   */
  parseBusinessInfo?: boolean;
}
interface ICallWorkflowParams {
  /**
   * 方法名称
   */
  action: string;
  /**
   * 方法的自定义参数，其中 envType, envId, uid, source 均无需填写
   */
  data?: Record<string, any>;
  /**
   * 是否自动将 data 的key 改为大写驼峰。默认为 true, 即使用时 data 可以采用小驼峰的 key
   */
  capitalizeDataKey?: boolean;
}

interface IGetBotList {
  name: string;
  introduction: string;
  information: string;
  enable: boolean;
  pageSize: number;
  pageNumber: number;
}
interface IGetBot {
  botId: string;
}
interface IGetBotChatRecords {
  botId: string;
  sort: 'asc' | 'desc' | (string & {});
  pageSize: number;
  pageNumber: number;
}
interface ISendBotFeedback {
  userFeedback: IUserFeedback;
}
interface IGetBotFeedback {
  botId: string;
  type: 'upvote' | 'downvote' | (string & {});
  sender: string;
  senderFilter: 'include' | 'exclude' | 'equal' | 'unequal' | 'prefix' | (string & {});
  minRating: number;
  maxRating: number;
  from: number;
  to: number;
  pageSize: number;
  pageNumber: number;
}
interface IGetBotRecommendQuestions {
  botId: string;
  name: string;
  introduction: string;
  agentSetting: string;
  msg: string;
  history: Array<{
    role: string;
    content: string;
  }>;
}
interface IBotSendMessage {
  botId: string;
  msg: string;
  history: Array<{
    role: string;
    content: string;
  }>;
}

interface AsyncIterableReadableStream<T> extends ReadableStream<T> {
  [Symbol.asyncIterator]: () => {
    next(): Promise<IteratorResult<T>>;
  };
}

interface StreamResult {
  get eventSourceStream(): AsyncIterableReadableStream<unknown>;
  get dataStream(): AsyncIterableReadableStream<{ content: string }>;
  get textStream(): AsyncIterableReadableStream<string>;
}

type ChatModelMessage = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

interface BaseChatModelInput {
  model: string;
  messages: Array<ChatModelMessage>;
  temperature?: number;
  top_p?: number;
}

interface StreamTextResult {
  eventSourceStream: AsyncIterableReadableStream<unknown>;
  dataStream: AsyncIterableReadableStream<unknown>;
  textStream: AsyncIterableReadableStream<unknown>;
}

interface ChatModel {
  generateText(data: BaseChatModelInput): Promise<{
    text: string;
    rawResponse: any;
  }>;
  streamText(data: BaseChatModelInput): Promise<StreamTextResult>;
}

interface Bot {
  list(props: IGetBotList): Promise<any>;
  get({ botId }: IGetBot): Promise<any>;
  getChatRecords(props: IGetBotChatRecords): Promise<any>;
  sendFeedback({ userFeedback }: ISendBotFeedback): Promise<any>;
  getFeedback(props: IGetBotFeedback): Promise<any>;
  getRecommendQuestions(props: IGetBotRecommendQuestions): Promise<StreamResult>;
  sendMessage(props: IBotSendMessage): Promise<StreamResult>;
}

interface AI {
  bot: Bot;
  createModel(model: string): ChatModel;
}

/**
 * 调用数据源
 *
 * @privateForWeDa
 * {"group": "cloud", "displayType": "function", "description": "调用数据源"}
 */
function callDataSource(params: ICallDataSourceParams): any;

/**
 * 通过 cloudid 获取静态文件的 http 访问地址
 *
 * @privateForWeDa
 * {"group": "cloud", "displayType": "function", "description": "通过 cloudid 获取静态文件的 http 访问地址"}
 */
function getTempFileURL(params: string | string[]): Promise<string | string[]>;

/**
 * 调用流程
 *
 * @privateForWeDa
 * {"group": "cloud", "displayType": "function", "description": "调用流程"}
 */
function callWorkflow(action: ICallWorkflowParams): Promise<any>;

/**
 * 调用云开发的云函数, 与 $w.cloud.getCloudInstance 示例中的效果大体一致
 *
 * @privateForWeDa
 * {"group": "cloud", "displayType": "function", "description": "调用云开发的云函数, 与 $w.cloud.getCloudInstance 示例中的效果大体一致"}
 */
function callFunction(params: ICallFunctionParams, parseOptions?: IParseOptions): Promise<any>;

/**
 * 返回云开发web-sdk初始化后的实例(无需关心tcb环境信息及认证登录的处理), 即 tcb.init 后返回的对象, 可用该对象直接调用tcb的各种能力
 *
 * @privateForWeDa
 * {"group": "cloud", "displayType": "function", "description": "返回云开发web-sdk初始化后的实例(无需关心tcb环境信息及认证登录的处理), 即 tcb.init 后返回的对象, 可用该对象直接调用tcb的各种能力"}
 */
function getCloudInstance(): Promise<cloudbase.app.App>;

/**
 * 在登录认证源设置中，h5开启 微信小程序OPENID登录 后，使用此函数可以返回带有微信小程序授权登录token参数的h5跳转链接，可以用于微信小程序webview中的h5页面openid静默授权登录
 *
 * @privateForWeDa
 * {"group": "cloud", "displayType": "function", "description": "在登录认证源设置中，h5开启 微信小程序OPENID登录 后，使用此函数可以返回带有微信小程序授权登录token参数的h5跳转链接，可以用于微信小程序webview中的h5页面openid静默授权登录"}
 */
function getUrlWithOpenidToken(src: string): Promise<string>;

/**
 * 返回 AI 类的实例，提供大模型接入、Agent 等能力，详情请参考<https://docs.cloudbase.net/ai/introduce>
 *
 * @privateForWeDa
 * {"group": "cloud", "displayType": "function", "description": "返回 AI 类的实例，提供大模型接入、Agent 等能力，详情请参考<https://docs.cloudbase.net/ai/introduce>"}
 */
function ai(): Promise<AI>;

  }

  /**
   * 平台工具方法集合
   */
  namespace utils {
    interface navigatorOptions {
  /**
   * 子应用包地址，例如 packages/subapp
   */
  packageName?: string;
  /**
   * 页面 ID
   */
  pageId: string;
  data?: Record<string, any>;
  /**
   * query object 对象
   */
  params?: Record<string, any>;
  events?: Record<string, (data: any) => void>;
  success?: (res: any) => void;
  fail?: (res: any) => void;
  complete?: (res: any) => void;

  [key: string]: any;
}

interface navigateBackOptions {
  /**
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
   */
  delta: number;
}

/**
 * 显示提示框
 */
function showToast(options);

/**
 * 显示全局加载中提示
 */
function showLoading(options);

/**
 * 隐藏全局加载中提示
 */
function hideLoading();

/**
 * 显示模态弹框
 */
function showModal(options);

/**
 * 拨打电话
 */
function callPhone(options);

/**
 * 扫描二维码
 */
function scanCode(options: {
  /**
   * 是否只能从相机扫码，不允许从相册选择图片
   */
  onlyFromCamera?: boolean;
  enableDefaultBehavior?: boolean;
  /**
   * 扫码类型
   */
  scanType?: ('barCode' | 'qrCode')[];
  /**
   * 接口调用成功的回调函数
   */
  success?: (res: { result: string; scanType: string }) => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: (err: Error) => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;
}): Promise<ScanCodeResult> | ScanCodeResult;

/** 微信能力 */
/**
 * 消息订阅
 * @param options
 */
function requestSubscribeMessage(options);
/**
 * 地图导航
 * @param options
 */
function openLocation(options);
/**
 * 预约视频号直播
 * @param options
 */
function reserveChannelsLive(options);
/**
 * 打开视频号主页
 * @param options
 */
function openChannelsUserProfile(options);
/**
 * 打开视频号直播
 * @param options
 */
function openChannelsLive(options);
/**
 * 打开视频号活动页
 * @param options
 */
function openChannelsEvent(options);
/**
 * 打开视频号视频
 * @param options
 */
function openChannelsActivity(options);
/**
 * 获取视频号直播预告信息
 * @param options
 */
function getChannelsLiveNoticeInfo(options);
/**
 * 获取视频号直播信息
 * @param options
 */
function getChannelsLiveInfo(options);
/**
 * 创建激励视频广告
 * @param options
 */
function createRewardedVideoAd(options);
/**
 * 创建插屏广告
 * @param options
 */
function createInterstitialAd(options);

// 特制路由
function navigateTo(options: navigatorOptions);

/**
 * 关闭当前页面，跳转到应用内的某个页面
 */
function redirectTo(options: navigatorOptions);

/**
 * 关闭所有页面，打开到应用内的某个页面
 */
function reLaunch(options: navigatorOptions);

/**
 * 返回首页
 */
function relaunchHome();

/**
 * 关闭当前页面，返回上一页面或多级页面
 */
function navigateBack(options: navigateBackOptions);

/**
 * 格式化枚举
 */
function formatEnum(path, optionname, app);

/**
 * 获取枚举值
 */
function getEnumValue({
  enumOptions,
  optionSetName,
  key,
}: {
  enumOptions?: { key: any; value: any }[] | { response?: { data?: { items?: any } } } | any;
  optionSetName?: string;
  key?: any;
});

/**
 * 修改页面标题
 */
function setTitle(newTitle: string): Promise<unknown>;

/**
 * 获取素材地址
 */
function resolveStaticResourceUrl(url: string): string;

  }

  /**
   * 设备信息
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "object", "displayName": "设备信息", "schema": {"type":"object","properties":{"viewport":{"type":"object","title":"窗口","properties":{"width":{"type":"number","title":"窗口宽度"},"height":{"type":"number","title":"窗口高度"}}},"networkType":{"type":"string","title":"网络类型"}}}}
   */
  namespace device {
    /**
 * 网络类型
 * pc端为空字符串
 */
enum NETWORK_TYPE {
  'wifi' = 'wifi',
  '2g' = '2g',
  '3g' = '3g',
  '4g' = '4g',
  '5g' = '5g',
  'other' = 'other',
  'unknown' = '',
}

/**
 * 窗口信息
 */
interface IViewport {
  /**
   * 窗口宽度
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "number", "displayName": "窗口宽度"}
   */
  width: number;
  /**
   * 窗口高度
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "number", "displayName": "窗口高度"}
   */
  height: number;
}

/**
 * 窗口
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "object", "displayName": "窗口"}
 */
const viewport: IViewport;
/**
 * 网络类型
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "网络类型"}
 */
const networkType: NETWORK_TYPE;

  }

  /**
   * 环境信息
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "object", "displayName": "环境信息", "schema": {"type":"object","properties":{"envId":{"type":"string","title":"环境 ID"},"type":{"type":"string","title":"环境类型"}}}}
   */
  namespace env {
    enum ENV_TYPE {
  /**
   * 生产
   */
  'production' = 'production',
  /**
   * 预览
   */
  'preview' = 'preview',
}

/**
 * 环境类型
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "环境类型"}
 */
const type: ENV_TYPE;
/**
 * 环境 ID
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "环境 ID"}
 */
const envId: string;

  }

  /**
   * 上下文信息
   *
   * @privateForWeDa
   * {"group": "sysVar", "displayType": "object", "displayName": "上下文信息", "schema": {"type":"object","properties":{"platforms":{"type":"array","title":"应用运行终端","items":{"type":"stirng"}},"isEditorMode":{"type":"boolean","title":"是否在编辑区"}}}}
   */
  namespace wedaContext {
    /**
 * 是否在编辑区
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "boolean", "displayName": "是否在编辑区"}
 */
const isEditorMode: boolean;

/**
 * 应用运行终端
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "应用运行终端"}
 */
const platforms: ('WEB' | 'MOBILEWEB' | 'PCWEB' | 'MP' | 'MOBILE')[];

  }

  // Global Query Inner Begin
  
[k: string]: any

// Global Query 全局查询 - Don't touch me
  // Global Query Inner End

  // Page Query Inner Begin

[k: string]: any

  // Page Query Inner End

  // Page EventFlow Inner Begin

[k: string]: any

  // Page EventFlow Inner End

  /**
* 绝对值
*
* @remarks
* 计算传入数字的绝对值
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "绝对值", "insertText": "ABS(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "计算传入数字的绝对值" , "definition": "ABS(数字):数字"}
*/
 function ABS(num: number): number;
/**
* 最小值
*
* @remarks
* 返回一组数字中的最小值
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "最小值", "insertText": "Min(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的最小值" , "definition": "Min(数字1, [数字2, ...]):数字"}
*/
 function Min(...args: number[]): number;
/**
* 最大值
*
* @remarks
* 返回一组数字中的最大值
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "最大值", "insertText": "Max(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的最大值" , "definition": "Max(数字1, [数字2, ...]):数字"}
*/
 function Max(...args: number[]): number;
/**
* 平均值
*
* @remarks
* 返回一组数字中的平均值
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "平均值", "insertText": "Average(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的平均值" , "definition": "Average(数字1, [数字2, ...]):数字"}
*/
 function Average(...args: number[]): number;
/**
* 向下取整
*
* @remarks
* 返回传入数字向下取整的结果
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "向下取整", "insertText": "Floor(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回传入数字向下取整的结果" , "definition": "Floor(数字):数字"}
*/
 function Floor(num: number): number;
/**
* 向上取整
*
* @remarks
* 返回传入数字向上取整的结果
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "向上取整", "insertText": "Ceiling(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回传入数字向上取整的结果" , "definition": "Ceiling(数字):数字"}
*/
 function Ceiling(num: number): number;
/**
* 四舍五入
*
* @remarks
* 返回传入数字四舍五入后的结果
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "四舍五入", "insertText": "Round(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回传入数字四舍五入后的结果" , "definition": "Round(数字):数字"}
*/
 function Round(num: number): number;
/**
* 求和
*
* @remarks
* 返回一组数字中的和
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "求和", "insertText": "Sum(1, 2)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一组数字中的和" , "definition": "Sum(数字1, [数字2, ...]):数字"}
*/
 function Sum(...args: number[]): number;
/**
* 随机数
*
* @remarks
* 返回一个指定范围的伪随机数，例如 Rand(10)，返回一个范围在 10 以内的随机数
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "随机数", "insertText": "Rand(1)", "subGroup": "calculation", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回一个指定范围的伪随机数，例如 Rand(10)，返回一个范围在 10 以内的随机数" , "definition": "Rand(数字):数字"}
*/
 function Rand(num: number): number;

 interface IIfObjectParam {
condition: boolean;
consequent?: any;
alternate?: any;
}
/**
* 条件分支
*
* @remarks
* 按判断条件进行逻辑比较，满足时返回一个值，不满足时返回另一个值。
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "条件分支", "insertText": "If(true, '您好', 'hello')", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "按判断条件进行逻辑比较，满足时返回一个值，不满足时返回另一个值。" , "definition": "If(判断条件, 满足时返回的值, 不满足时返回的值):任何类型"}
*/
 function If(params: IIfObjectParam): any;
 function If(condition: boolean, consequent?: any, alternate?: any): any;
/**
* 是否为空
*
* @remarks
* 判断传入的文本是否为空
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "是否为空", "insertText": "IsEmpty('hello')", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的文本是否为空" , "definition": "IsEmpty(值):布尔值"}
*/
 function IsEmpty(text: string | string[]): boolean;
/**
* 与
*
* @remarks
* 用于确定所有判断条件是否为真
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "与", "insertText": "And(true, false)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "用于确定所有判断条件是否为真" , "definition": "And(判断条件1, [判断条件2,...]):布尔值"}
*/
 function And(...args: boolean[]): boolean;
/**
* 或
*
* @remarks
* 任意一个判断条件为真，则结果为真；所有条件为否，结果才为否
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "或", "insertText": "Or(true, false)", "subGroup": "logic", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "任意一个判断条件为真，则结果为真；所有条件为否，结果才为否" , "definition": "Or(判断条件1, [判断条件2,...]):布尔值"}
*/
 function Or(...args: boolean[]): boolean;

/**
* 获取文本长度
*
* @remarks
* 获取传入文本的字符数
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取文本长度", "insertText": "Len('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "获取传入文本的字符数" , "definition": "Len(文本):数字"}
*/
 function Len(text: string): number;
/**
* 是否包含指定文本
*
* @remarks
* 判断文本 1 是否包含文本 2
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "是否包含指定文本", "insertText": "Contains('文本1', '文本2')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断文本 1 是否包含文本 2" , "definition": "Contains(文本1, 文本2):布尔值"}
*/
 function Contains(text1: string, text2: string): boolean;
/**
* 拆分文本
*
* @remarks
* 根据传入的文本 2，将文本 1 拆分成文本数组，例如 Split("张三,李四,王五", ",")
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "拆分文本", "insertText": "Split('文本1', '文本2')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据传入的文本 2，将文本 1 拆分成文本数组，例如 Split('张三,李四,王五', ',')" , "definition": "Split(文本1,文本2):文本数组"}
*/
 function Split(text1: string, text2: string): string[];
/**
* 删除开头/结尾空格和制表符
*
* @remarks
* 删除文本开头和结尾的所有空格和制表符，文本中间的空格和制表符不会删除
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "删除开头/结尾空格和制表符", "insertText": "Trim('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "删除文本开头和结尾的所有空格和制表符，文本中间的空格和制表符不会删除" , "definition": "Trim(文本):文本"}
*/
 function Trim(text: string): string;
/**
* 转换为大写
*
* @remarks
* 将传入的文本转为全大写文本
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "转换为大写", "insertText": "Upper('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "将传入的文本转为全大写文本" , "definition": "Upper(文本):文本"}
*/
 function Upper(text: string): string;
/**
* 转换为小写
*
* @remarks
* 将传入的文本转为全小写文本
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "转换为小写", "insertText": "Lower('文本')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "将传入的文本转为全小写文本" , "definition": "Lower(文本):文本"}
*/
 function Lower(text: string): string;
/**
* 文本拼接
*
* @remarks
* 返回多个文本拼接后的新文本
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "文本拼接", "insertText": "Concat('文本1', '文本2')", "subGroup": "text", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回多个文本拼接后的新文本" , "definition": "Concat(文本1, [文本2,...]):文本"}
*/
 function Concat(...text: string[]): string;

/**
* 获取现在时间
*
* @remarks
* 返回当前系统时间，通常与其他日期时间函数搭配使用
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取现在时间", "insertText": "Now()", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回当前系统时间，通常与其他日期时间函数搭配使用" , "definition": "Now():日期时间"}
*/
 function Now(): number;
/**
* 获取时间戳
*
* @remarks
* 根据输入的日期时间返回时间戳
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取时间戳", "insertText": "Timestamp(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回时间戳" , "definition": "Timestamp(日期时间):日期时间"}
*/
 function Timestamp(arg: number | string | Date): number;
/**
* 获取秒数
*
* @remarks
* 根据输入的日期时间返回该时间的秒数
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取秒数", "insertText": "Second(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的秒数" , "definition": "Second(日期时间):数字"}
*/
 function Second(arg: number | string | Date): number;
/**
* 获取分钟数
*
* @remarks
* 根据输入的日期时间返回该时间的分钟部分
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取分钟数", "insertText": "Minute(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的分钟部分" , "definition": "Minute(日期时间):数字"}
*/
 function Minute(arg: number | string | Date): number;
/**
* 获取小时数
*
* @remarks
* 根据输入的日期时间返回该时间的小时部分，24小时制
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取小时数", "insertText": "Hour(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的小时部分，24小时制" , "definition": "Hour(日期时间):数字"}
*/
 function Hour(arg: number | string | Date): number;
/**
* 获取天数
*
* @remarks
* 根据输入的日期时间返回该时间的日部分，范围为 1-31
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取天数", "insertText": "Day(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的日部分，范围为 1-31" , "definition": "Day(日期时间):数字"}
*/
 function Day(arg: number | string | Date): number;
/**
* 获取星期数
*
* @remarks
* 根据输入的日期时间返回该时间的星期数
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取星期数", "insertText": "DayOfWeek(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的星期数" , "definition": "DayOfWeek(日期时间):数字"}
*/
 function DayOfWeek(arg: number | string | Date): number;
/**
* 获取月数
*
* @remarks
* 根据输入的日期时间返回该时间的月份
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取月数", "insertText": "Month(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的月份" , "definition": "Month(日期时间):数字"}
*/
 function Month(arg: number | string | Date): number;
/**
* 获取年份
*
* @remarks
* 根据输入的日期时间返回该时间的年份
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "获取年份", "insertText": "Year(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的日期时间返回该时间的年份" , "definition": "Year(日期时间):数字"}
*/
 function Year(arg: number | string | Date): number;
/**
* 使用年月日创建日期时间
*
* @remarks
* 根据输入的年月日数值返回一个日期类型的数据，例如 GetDate(2017,3,24)
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "使用年月日创建日期时间", "insertText": "GetDate(2011, 7, 2)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的年月日数值返回一个日期类型的数据，例如 GetDate(2017,3,24)" , "definition": "GetDate(数字,数字,数字):日期时间"}
*/
 function GetDate(year: number, month: number, day: number): number;
/**
* 使用时间日期文本创建日期时间
*
* @remarks
* 将日期时间文本根据指定格式转化为日期时间，例如 DateTimeValue("2021-12-11 01:19:12", "yyyy-MM-dd HH:mm:ss")
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "使用时间日期文本创建日期时间", "insertText": "DateTimeValue('2011-07-02', 'YYYY:MM:DD')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "将日期时间文本根据指定格式转化为日期时间，例如 DateTimeValue('2021-12-11 01:19:12', 'yyyy-MM-dd HH:mm:ss')" , "definition": "DateTimeValue(文本, 文本):日期时间"}
*/
 function DateTimeValue(arg: string, val: string): number;
/**
* 计算年龄
*
* @remarks
* 根据输入的两个日期时间计算出年龄，例如 Age(Date(2017,3,24), Date(2021,3,24))
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "计算年龄", "insertText": "Age(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "根据输入的两个日期时间计算出年龄，例如 Age(Date(2017,3,24), Date(2021,3,24))" , "definition": "Age(日期时间,日期时间):数字"}
*/
 function Age(arg: number | string | Date, val: number | string | Date): number;
/**
* 计算当前年龄
*
* @remarks
* 计算当前年龄，例如 AgeOfNow(Date(2017,3,24))
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "计算当前年龄", "insertText": "AgeOfNow(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "计算当前年龄，例如 AgeOfNow(Date(2017,3,24))" , "definition": "AgeOfNow(日期时间):数字"}
*/
 function AgeOfNow(arg: number | string | Date): number;
/**
* 增加 X 天
*
* @remarks
* 在传入的日期时间上增加 X 天，支持负数
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "增加 X 天", "insertText": "DateAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期时间上增加 X 天，支持负数" , "definition": "DateAdd(日期时间, 数字):日期时间"}
*/
 function DateAdd(arg: number | string | Date, day: number): number;
/**
* 增加 X 月
*
* @remarks
* 在传入的日期和时间上增加 X 月，支持负数
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "增加 X 月", "insertText": "MonthAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期和时间上增加 X 月，支持负数" , "definition": "MonthAdd(日期时间, 数字):日期时间"}
*/
 function MonthAdd(arg: number | string | Date, month: number): number;
/**
* 增加 X 年
*
* @remarks
* 在传入的日期和时间上增加 X 年，支持负数
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "增加 X 年", "insertText": "YearAdd(1661334203345, 1)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "在传入的日期和时间上增加 X 年，支持负数" , "definition": "YearAdd(日期时间, 数字):日期时间"}
*/
 function YearAdd(arg: number | string | Date, year: number): number;
/**
* 天数差
*
* @remarks
* 返回两个日期时间字段之间的天数差，如果为同一天，差数为零
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "天数差", "insertText": "DateDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的天数差，如果为同一天，差数为零" , "definition": "DateDiff(日期时间, 日期时间):数字"}
*/
 function DateDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
* 小时差
*
* @remarks
* 返回两个日期时间字段之间的小时差，如果为同一小时，差数为零
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "小时差", "insertText": "HourDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的小时差，如果为同一小时，差数为零" , "definition": "HourDiff(日期时间, 日期时间):数字"}
*/
 function HourDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
* 分钟差
*
* @remarks
* 返回两个日期时间字段之间的分钟差，如果为同一分钟，差数为零
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "分钟差", "insertText": "MinuteDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的分钟差，如果为同一分钟，差数为零" , "definition": "MinuteDiff(日期时间, 日期时间):数字"}
*/
 function MinuteDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
* 秒数差
*
* @remarks
* 返回两个日期时间字段之间的秒数差，如果为同一秒，差数为零
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "秒数差", "insertText": "SecondDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的秒数差，如果为同一秒，差数为零" , "definition": "SecondDiff(日期时间, 日期时间):数字"}
*/
 function SecondDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
* 月数差
*
* @remarks
* 返回两个日期时间字段之间的月数差，如果为同一月，差数为零
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "月数差", "insertText": "MonthDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的月数差，如果为同一月，差数为零" , "definition": "MonthDiff(日期时间, 日期时间):数字"}
*/
 function MonthDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
* 年数差
*
* @remarks
* 返回两个日期时间字段之间的年数差，如果为同一年，差数为零
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "年数差", "insertText": "YearDiff(1661334203345, 1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "返回两个日期时间字段之间的年数差，如果为同一年，差数为零" , "definition": "YearDiff(日期时间, 日期时间):数字"}
*/
 function YearDiff(startDay: number | string | Date, endDay: number | string | Date): number;
/**
* 日期时间格式化
*
* @remarks
* 格式化日期时间为指定格式的文本，例如 DateText(Date(2017,3,24), "yyyy-MM-dd HH:mm:ss")
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "日期时间格式化", "insertText": "DateText(1661334203345, 'YYYY-MM-DD HH:mm:ss')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "格式化日期时间为指定格式的文本，例如 DateText(Date(2017,3,24), 'yyyy-MM-dd HH:mm:ss')" , "definition": "DateText(日期时间, 文本):文本"}
*/
 function DateText(createdTime: number | string | Date, text: string): string;
/**
* 时间格式化
*
* @remarks
* 格式化时间为指定格式的文本，输入时间为(小时 * 60 * 60 + 分钟 * 60) * 1000计算而来，例如 TimeText(28800000, "HH:mm")
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "时间格式化", "insertText": "TimeText(28800000, 'HH:mm')", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils#.E6.97.B6.E9.97.B4.E6.97.A5.E6.9C.9F" , "description": "格式化时间为指定格式的文本，输入时间为(小时 * 60 * 60 + 分钟 * 60) * 1000计算而来，例如 TimeText(28800000, 'HH:mm')" , "definition": "TimeText(时间, 文本):文本"}
*/
 function TimeText(createdTime: number, text: string): string;
/**
* 是否为今天
*
* @remarks
* 判断传入的日期时间是否为今天，例如 IsToday(Date(2022,4,8))
*
* @privateForWeDa
* {"group": "formula", "displayType": "function", "displayName": "是否为今天", "insertText": "IsToday(1661334203345)", "subGroup": "time", "doc": "https://docs.cloudbase.net/lowcode/api/expression-utils" , "description": "判断传入的日期时间是否为今天，例如 IsToday(Date(2022,4,8))" , "definition": "IsToday(日期时间):布尔值"}
*/
 function IsToday(date: number | string | Date): boolean;


  // used widgets Inner Begin

          /**
          * 轮播图
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"轮播图","description":"","baseClass":"gsd_h5_react_Carousel","datasource":"$carousel1_start$ $carousel1_end$"}
           */
          const carousel1: gsd_h5_react_Carousel

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container3_start$ $container3_end$"}
           */
          const container3: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container6_start$ $container6_end$"}
           */
          const container6: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container8_start$ $container8_end$"}
           */
          const container8: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container7_start$ $container7_end$"}
           */
          const container7: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container9_start$ $container9_end$"}
           */
          const container9: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container5_start$ $container5_end$"}
           */
          const container5: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container10_start$ $container10_end$"}
           */
          const container10: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container4_start$ $container4_end$"}
           */
          const container4: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container11_start$ $container11_end$"}
           */
          const container11: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container1_start$ $container1_end$"}
           */
          const container1: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container2_start$ $container2_end$"}
           */
          const container2: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container12_start$ $container12_end$"}
           */
          const container12: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container13_start$ $container13_end$"}
           */
          const container13: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container15_start$ $container15_end$"}
           */
          const container15: gsd_h5_react_Container

          /**
          * 普通容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"普通容器","description":"","baseClass":"gsd_h5_react_Container","datasource":"$container14_start$ $container14_end$"}
           */
          const container14: gsd_h5_react_Container

          /**
          * 图标
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"图标","description":"","baseClass":"gsd_h5_react_WdIcon","datasource":"$icon3_start$ $icon3_end$"}
           */
          const icon3: gsd_h5_react_WdIcon

          /**
          * 图标
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"图标","description":"","baseClass":"gsd_h5_react_WdIcon","datasource":"$icon4_start$ $icon4_end$"}
           */
          const icon4: gsd_h5_react_WdIcon

          /**
          * 图标
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"图标","description":"","baseClass":"gsd_h5_react_WdIcon","datasource":"$icon2_start$ $icon2_end$"}
           */
          const icon2: gsd_h5_react_WdIcon

          /**
          * 图标
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"图标","description":"","baseClass":"gsd_h5_react_WdIcon","datasource":"$icon1_start$ $icon1_end$"}
           */
          const icon1: gsd_h5_react_WdIcon

          /**
          * 图标
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"图标","description":"","baseClass":"gsd_h5_react_WdIcon","datasource":"$icon5_start$ $icon5_end$"}
           */
          const icon5: gsd_h5_react_WdIcon

          /**
          * 图标
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"图标","description":"","baseClass":"gsd_h5_react_WdIcon","datasource":"$icon6_start$ $icon6_end$"}
           */
          const icon6: gsd_h5_react_WdIcon

          /**
          * 图标
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"图标","description":"","baseClass":"gsd_h5_react_WdIcon","datasource":"$icon7_start$ $icon7_end$"}
           */
          const icon7: gsd_h5_react_WdIcon

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text4_start$ $text4_end$"}
           */
          const text4: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text6_start$ $text6_end$"}
           */
          const text6: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text5_start$ $text5_end$"}
           */
          const text5: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text7_start$ $text7_end$"}
           */
          const text7: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text3_start$ $text3_end$"}
           */
          const text3: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text8_start$ $text8_end$"}
           */
          const text8: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text2_start$ $text2_end$"}
           */
          const text2: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text1_start$ $text1_end$"}
           */
          const text1: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text9_start$ $text9_end$"}
           */
          const text9: gsd_h5_react_WdText

          /**
          * 文本
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"文本","description":"","baseClass":"gsd_h5_react_WdText","datasource":"$text10_start$ $text10_end$"}
           */
          const text10: gsd_h5_react_WdText

          /**
          * 表单容器
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"表单容器","description":"","baseClass":"gsd_h5_react_WdForm","datasource":"$form1_start$ $form1_end$"}
           */
          const form1: gsd_h5_react_WdForm

          /**
          * 联系人姓名
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"联系人姓名","description":"","baseClass":"gsd_h5_react_WdInput","datasource":"$input1_start$ $input1_end$"}
           */
          const input1: gsd_h5_react_WdInput

          /**
          * 地址
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"地址","description":"","baseClass":"gsd_h5_react_WdInput","datasource":"$input2_start$ $input2_end$"}
           */
          const input2: gsd_h5_react_WdInput

          /**
          * 联系人电话
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"联系人电话","description":"","baseClass":"gsd_h5_react_WdInputPhone","datasource":"$inputPhone1_start$ $inputPhone1_end$"}
           */
          const inputPhone1: gsd_h5_react_WdInputPhone

          /**
          * 备注（详细描述）
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"备注（详细描述）","description":"","baseClass":"gsd_h5_react_WdTextarea","datasource":"$textarea1_start$ $textarea1_end$"}
           */
          const textarea1: gsd_h5_react_WdTextarea

          /**
          * 状态
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"状态","description":"","baseClass":"gsd_h5_react_WdSelect","datasource":"$select1_start$ $select1_end$"}
           */
          const select1: gsd_h5_react_WdSelect

          /**
          * 照片
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"照片","description":"","baseClass":"gsd_h5_react_WdUploadImage","datasource":"$uploadImage1_start$ $uploadImage1_end$"}
           */
          const uploadImage1: gsd_h5_react_WdUploadImage

          /**
          * 按钮
* 
* @privateForWeDa
* {"group":"component","displayType":"component","displayName":"按钮","description":"","baseClass":"gsd_h5_react_WdButton","datasource":"$button1_start$ $button1_end$"}
           */
          const button1: gsd_h5_react_WdButton
  // used widgets Inner End

  // repeater scope Inner Begin

[k: string]: any

  // repeater scope Inner End
}

// 为了 $w.xxx 不报错
declare const $w: typeof __w__ & {
  [key: string]: any;
};



// $page Begin
declare namespace $page {
  /**
 * 页面 ID
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "页面 ID"}
 */
const id: string;
/**
 * 页面名称
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "页面名称"}
 */
const label: string;
/**
 * 页面路径
 *
 * @privateForWeDa
 * {"group": "sysVar", "displayType": "string", "displayName": "页面路径"}
 */
const path: string;

/**
 * 页面数据对象
 */
namespace dataset {
  /**
   * 页面变量
   */
  const state: {
    // Page State Inner Begin

[k: string]: any

    // Page State Inner End
  };
  /**
   * 页面参数
   */
  const params: {
    // Page Param Inner Begin

/**
 * type
 * 
 * @privateForWeDa
 * {"group":"pageParam","displayType":"string","displayName":"","description":"","schema":null,"dataFieldInfo":{"type":"string"}}
 */
type?: string
[k: string]: any

    // Page Param Inner End
  };
}

/**
 * 页面定义 handler 方法
 */
namespace handler {
  // Page Handler Inner Begin

[k: string]: any

  // Page Handler Inner End
}

/**
 * 设置页面变量
 */
function setState(userSetState: Record<string, any>): void;

}
// $page End





// event 支持 detail 等对象
interface Event {
  detail: any;
}
let event: Event | undefined;

/**
 * wx API
 */
const wx: any;

declare namespace SERVER {
  // Server side state Inner Begin
  
// Server side state - Don't touch me
  // Server side state Inner End
}

let params: any;

// DTS String Inner Begin

            const _aegis: any
const __renderJsHash__: any
const chobitsu: any
const fs: any
const process: any
const Go: any
const tcbAdapterPrivatelink: any
const mobx: any
const CloudSDK: any
const ZXing: any
const acorn: any
const webpackChunkweda_render: any
const __testExpr: any
const WedaClientSDK: any
const $app: any
const $w: any
const addEventListener: any
const removeEventListener: any
const singleSpaNavigate: any
const ReactRouterDOM: any
const weda-render: any
const _WedaHostConfig: any
const wx: any
const $refreshSimulator: any
const _WedaSandboxConfig: any
const compDraggable: any
const _WEAPPS_HISTORY: any
const __WEDA_LOG_LEVEL__: any
const react: any
const ReactDom: any
const ReactDomServer: any
const Mobx: any
const mobx-react-lite: any
const MobxReactLite: any
const LodashGet: any
const LodashRemove: any
const LodashSet: any
const ReactErrorBoundary: any
const WedaAppContext: any
const $global: any
const @weapps-materials-control-gsd-h5-react: any
const webpackChunk_weapps_materials_gsd_h5_react: any
const filterXSS: any
const vttjs: any
const WebVTT: any
const @weapps-materials-main-gsd-h5-react: any
const $page: any
const __debugExprMap: any
const onShareAppMessage: any

              interface Window {
                [key: string]: any
              }

            declare namespace React {
  //
  // React Elements
  // ----------------------------------------------------------------------

  type ElementType<P = any> =
      {
          [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never
      }[keyof JSX.IntrinsicElements] |
      ComponentType<P>;
  /**
   * @deprecated Please use `ElementType`
   */
  type ReactType<P = any> = ElementType<P>;
  type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

  type JSXElementConstructor<P> =
      | ((props: P) => ReactElement<any, any> | null)
      | (new (props: P) => Component<any, any>);

  interface RefObject<T> {
      readonly current: T | null;
  }
  // Bivariance hack for consistent unsoundness with RefObject
  type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];
  type Ref<T> = RefCallback<T> | RefObject<T> | null;
  type LegacyRef<T> = string | Ref<T>;
  /**
   * Gets the instance type for a React element. The instance will be different for various component types:
   *
   * - React class components will be the class instance. So if you had `class Foo extends React.Component<{}> {}`
   *   and used `React.ElementRef<typeof Foo>` then the type would be the instance of `Foo`.
   * - React stateless functional components do not have a backing instance and so `React.ElementRef<typeof Bar>`
   *   (when `Bar` is `function Bar() {}`) will give you the `undefined` type.
   * - JSX intrinsics like `div` will give you their DOM instance. For `React.ElementRef<'div'>` that would be
   *   `HTMLDivElement`. For `React.ElementRef<'input'>` that would be `HTMLInputElement`.
   * - React stateless functional components that forward a `ref` will give you the `ElementRef` of the forwarded
   *   to component.
   *
   * `C` must be the type _of_ a React component so you need to use typeof as in React.ElementRef<typeof MyComponent>.
   *
   * @todo In Flow, this works a little different with forwarded refs and the `AbstractComponent` that
   *       `React.forwardRef()` returns.
   */
  type ElementRef<
      C extends
          | ForwardRefExoticComponent<any>
          | { new (props: any): Component<any> }
          | ((props: any, context?: any) => ReactElement | null)
          | keyof JSX.IntrinsicElements
  > =
      // need to check first if `ref` is a valid prop for ts@3.0
      // otherwise it will infer `{}` instead of `never`
      "ref" extends keyof ComponentPropsWithRef<C>
          ? NonNullable<ComponentPropsWithRef<C>["ref"]> extends Ref<
              infer Instance
          >
              ? Instance
              : never
          : never;

  type ComponentState = any;

  type Key = string | number;

  /**
   * @internal You shouldn't need to use this type since you never see these attributes
   * inside your component or have to validate them.
   */
  interface Attributes {
      key?: Key | null | undefined;
  }
  interface RefAttributes<T> extends Attributes {
      ref?: Ref<T> | undefined;
  }
  interface ClassAttributes<T> extends Attributes {
      ref?: LegacyRef<T> | undefined;
  }

  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
      type: T;
      props: P;
      key: Key | null;
  }

  interface ReactComponentElement<
      T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
      P = Pick<ComponentProps<T>, Exclude<keyof ComponentProps<T>, 'key' | 'ref'>>
  > extends ReactElement<P, Exclude<T, number>> { }

  /**
   * @deprecated Please use `FunctionComponentElement`
   */
  type SFCElement<P> = FunctionComponentElement<P>;

  interface FunctionComponentElement<P> extends ReactElement<P, FunctionComponent<P>> {
      ref?: ('ref' extends keyof P ? P extends { ref?: infer R | undefined } ? R : never : never) | undefined;
  }

  type CElement<P, T extends Component<P, ComponentState>> = ComponentElement<P, T>;
  interface ComponentElement<P, T extends Component<P, ComponentState>> extends ReactElement<P, ComponentClass<P>> {
      ref?: LegacyRef<T> | undefined;
  }

  type ClassicElement<P> = CElement<P, ClassicComponent<P, ComponentState>>;

  // string fallback for custom web-components
  interface DOMElement<P extends HTMLAttributes<T> | SVGAttributes<T>, T extends Element> extends ReactElement<P, string> {
      ref: LegacyRef<T>;
  }

  // ReactHTML for ReactHTMLElement
  interface ReactHTMLElement<T extends HTMLElement> extends DetailedReactHTMLElement<AllHTMLAttributes<T>, T> { }

  interface DetailedReactHTMLElement<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMElement<P, T> {
      type: keyof ReactHTML;
  }

  // ReactSVG for ReactSVGElement
  interface ReactSVGElement extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
      type: keyof ReactSVG;
  }

  interface ReactPortal extends ReactElement {
      key: Key | null;
      children: ReactNode;
  }

  //
  // Factories
  // ----------------------------------------------------------------------

  type Factory<P> = (props?: Attributes & P, ...children: ReactNode[]) => ReactElement<P>;

  /**
   * @deprecated Please use `FunctionComponentFactory`
   */
  type SFCFactory<P> = FunctionComponentFactory<P>;

  type FunctionComponentFactory<P> = (props?: Attributes & P, ...children: ReactNode[]) => FunctionComponentElement<P>;

  type ComponentFactory<P, T extends Component<P, ComponentState>> =
      (props?: ClassAttributes<T> & P, ...children: ReactNode[]) => CElement<P, T>;

  type CFactory<P, T extends Component<P, ComponentState>> = ComponentFactory<P, T>;
  type ClassicFactory<P> = CFactory<P, ClassicComponent<P, ComponentState>>;

  type DOMFactory<P extends DOMAttributes<T>, T extends Element> =
      (props?: ClassAttributes<T> & P | null, ...children: ReactNode[]) => DOMElement<P, T>;

  interface HTMLFactory<T extends HTMLElement> extends DetailedHTMLFactory<AllHTMLAttributes<T>, T> {}

  interface DetailedHTMLFactory<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMFactory<P, T> {
      (props?: ClassAttributes<T> & P | null, ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
  }

  interface SVGFactory extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
      (props?: ClassAttributes<SVGElement> & SVGAttributes<SVGElement> | null, ...children: ReactNode[]): ReactSVGElement;
  }

  //
  // React Nodes
  // http://facebook.github.io/react/docs/glossary.html
  // ----------------------------------------------------------------------

  type ReactText = string | number;
  type ReactChild = ReactElement | ReactText;

  /**
   * @deprecated Use either `ReactNode[]` if you need an array or `Iterable<ReactNode>` if its passed to a host component.
   */
  interface ReactNodeArray extends ReadonlyArray<ReactNode> {}
  type ReactFragment = {} | Iterable<ReactNode>;
  type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

  //
  // Top Level API
  // ----------------------------------------------------------------------

  // DOM Elements
  function createFactory<T extends HTMLElement>(
      type: keyof ReactHTML): HTMLFactory<T>;
  function createFactory(
      type: keyof ReactSVG): SVGFactory;
  function createFactory<P extends DOMAttributes<T>, T extends Element>(
      type: string): DOMFactory<P, T>;

  // Custom components
  function createFactory<P>(type: FunctionComponent<P>): FunctionComponentFactory<P>;
  function createFactory<P>(
      type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>): CFactory<P, ClassicComponent<P, ComponentState>>;
  function createFactory<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
      type: ClassType<P, T, C>): CFactory<P, T>;
  function createFactory<P>(type: ComponentClass<P>): Factory<P>;

  // DOM Elements
  // TODO: generalize this to everything in `keyof ReactHTML`, not just "input"
  function createElement(
      type: "input",
      props?: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | null,
      ...children: ReactNode[]): DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
      type: keyof ReactHTML,
      props?: ClassAttributes<T> & P | null,
      ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
  function createElement<P extends SVGAttributes<T>, T extends SVGElement>(
      type: keyof ReactSVG,
      props?: ClassAttributes<T> & P | null,
      ...children: ReactNode[]): ReactSVGElement;
  function createElement<P extends DOMAttributes<T>, T extends Element>(
      type: string,
      props?: ClassAttributes<T> & P | null,
      ...children: ReactNode[]): DOMElement<P, T>;

  // Custom components

  function createElement<P extends {}>(
      type: FunctionComponent<P>,
      props?: Attributes & P | null,
      ...children: ReactNode[]): FunctionComponentElement<P>;
  function createElement<P extends {}>(
      type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>,
      props?: ClassAttributes<ClassicComponent<P, ComponentState>> & P | null,
      ...children: ReactNode[]): CElement<P, ClassicComponent<P, ComponentState>>;
  function createElement<P extends {}, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
      type: ClassType<P, T, C>,
      props?: ClassAttributes<T> & P | null,
      ...children: ReactNode[]): CElement<P, T>;
  function createElement<P extends {}>(
      type: FunctionComponent<P> | ComponentClass<P> | string,
      props?: Attributes & P | null,
      ...children: ReactNode[]): ReactElement<P>;

  // DOM Elements
  // ReactHTMLElement
  function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
      element: DetailedReactHTMLElement<P, T>,
      props?: P,
      ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
  // ReactHTMLElement, less specific
  function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
      element: ReactHTMLElement<T>,
      props?: P,
      ...children: ReactNode[]): ReactHTMLElement<T>;
  // SVGElement
  function cloneElement<P extends SVGAttributes<T>, T extends SVGElement>(
      element: ReactSVGElement,
      props?: P,
      ...children: ReactNode[]): ReactSVGElement;
  // DOM Element (has to be the last, because type checking stops at first overload that fits)
  function cloneElement<P extends DOMAttributes<T>, T extends Element>(
      element: DOMElement<P, T>,
      props?: DOMAttributes<T> & P,
      ...children: ReactNode[]): DOMElement<P, T>;

  // Custom components
  function cloneElement<P>(
      element: FunctionComponentElement<P>,
      props?: Partial<P> & Attributes,
      ...children: ReactNode[]): FunctionComponentElement<P>;
  function cloneElement<P, T extends Component<P, ComponentState>>(
      element: CElement<P, T>,
      props?: Partial<P> & ClassAttributes<T>,
      ...children: ReactNode[]): CElement<P, T>;
  function cloneElement<P>(
      element: ReactElement<P>,
      props?: Partial<P> & Attributes,
      ...children: ReactNode[]): ReactElement<P>;

  // Context via RenderProps
  interface ProviderProps<T> {
      value: T;
      children?: ReactNode | undefined;
  }

  interface ConsumerProps<T> {
      children: (value: T) => ReactNode;
  }

  // TODO: similar to how Fragment is actually a symbol, the values returned from createContext,
  // forwardRef and memo are actually objects that are treated specially by the renderer; see:
  // https://github.com/facebook/react/blob/v16.6.0/packages/react/src/ReactContext.js#L35-L48
  // https://github.com/facebook/react/blob/v16.6.0/packages/react/src/forwardRef.js#L42-L45
  // https://github.com/facebook/react/blob/v16.6.0/packages/react/src/memo.js#L27-L31
  // However, we have no way of telling the JSX parser that it's a JSX element type or its props other than
  // by pretending to be a normal component.
  //
  // We don't just use ComponentType or FunctionComponent types because you are not supposed to attach statics to this
  // object, but rather to the original function.
  interface ExoticComponent<P = {}> {
      /**
       * **NOTE**: Exotic components are not callable.
       */
      (props: P): (ReactElement|null);
      readonly $typeof: symbol;
  }

  interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
      displayName?: string | undefined;
  }

  interface ProviderExoticComponent<P> extends ExoticComponent<P> {
      propTypes?: WeakValidationMap<P> | undefined;
  }

  type ContextType<C extends Context<any>> = C extends Context<infer T> ? T : never;

  // NOTE: only the Context object itself can get a displayName
  // https://github.com/facebook/react-devtools/blob/e0b854e4c/backend/attachRendererFiber.js#L310-L325
  type Provider<T> = ProviderExoticComponent<ProviderProps<T>>;
  type Consumer<T> = ExoticComponent<ConsumerProps<T>>;
  interface Context<T> {
      Provider: Provider<T>;
      Consumer: Consumer<T>;
      displayName?: string | undefined;
  }
  function createContext<T>(
      // If you thought this should be optional, see
      // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
      defaultValue: T,
  ): Context<T>;

  function isValidElement<P>(object: {} | null | undefined): object is ReactElement<P>;

  const Children: ReactChildren;
  const Fragment: ExoticComponent<{ children?: ReactNode | undefined }>;
  const StrictMode: ExoticComponent<{ children?: ReactNode | undefined }>;

  interface SuspenseProps {
      children?: ReactNode | undefined;

      // TODO(react18): `fallback?: ReactNode;`
      /** A fallback react tree to show when a Suspense child (like React.lazy) suspends */
      fallback: NonNullable<ReactNode>|null;
  }

  // TODO(react18): Updated JSDoc to reflect that Suspense works on the server.
  /**
   * This feature is not yet available for server-side rendering.
   * Suspense support will be added in a later release.
   */
  const Suspense: ExoticComponent<SuspenseProps>;
  const version: string;

  /**
   * {@link https://reactjs.org/docs/profiler.html#onrender-callback Profiler API}
   */
  type ProfilerOnRenderCallback = (
      id: string,
      phase: "mount" | "update",
      actualDuration: number,
      baseDuration: number,
      startTime: number,
      commitTime: number,
      interactions: Set<SchedulerInteraction>,
  ) => void;
  interface ProfilerProps {
      children?: ReactNode | undefined;
      id: string;
      onRender: ProfilerOnRenderCallback;
  }

  const Profiler: ExoticComponent<ProfilerProps>;

  //
  // Component API
  // ----------------------------------------------------------------------

  type ReactInstance = Component<any> | Element;

  // Base component for plain JS classes
  interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
  class Component<P, S> {
      // tslint won't let me format the sample code in a way that vscode likes it :(
      /**
       * If set, `this.context` will be set at runtime to the current value of the given Context.
       *
       * Usage:
       *
       * ```ts
       * type MyContext = number
       * const Ctx = React.createContext<MyContext>(0)
       *
       * class Foo extends React.Component {
       *   static contextType = Ctx
       *   context!: React.ContextType<typeof Ctx>
       *   render () {
       *     return <>My context's value: {this.context}</>;
       *   }
       * }
       * ```
       *
       * @see https://reactjs.org/docs/context.html#classcontexttype
       */
      static contextType?: Context<any> | undefined;

      /**
       * If using the new style context, re-declare this in your class to be the
       * `React.ContextType` of your `static contextType`.
       * Should be used with type annotation or static contextType.
       *
       * ```ts
       * static contextType = MyContext
       * // For TS pre-3.7:
       * context!: React.ContextType<typeof MyContext>
       * // For TS 3.7 and above:
       * declare context: React.ContextType<typeof MyContext>
       * ```
       *
       * @see https://reactjs.org/docs/context.html
       */
      // TODO (TypeScript 3.0): unknown
      context: any;

      constructor(props: Readonly<P> | P);
      /**
       * @deprecated
       * @see https://reactjs.org/docs/legacy-context.html
       */
      constructor(props: P, context: any);

      // We MUST keep setState() as a unified signature because it allows proper checking of the method return type.
      // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365#issuecomment-351013257
      // Also, the ` | S` allows intellisense to not be dumbisense
      setState<K extends keyof S>(
          state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
          callback?: () => void
      ): void;

      forceUpdate(callback?: () => void): void;
      render(): ReactNode;

      // React.Props<T> is now deprecated, which means that the `children`
      // property is not available on `P` by default, even though you can
      // always pass children as variadic arguments to `createElement`.
      // In the future, if we can define its call signature conditionally
      // on the existence of `children` in `P`, then we should remove this.
      readonly props: Readonly<P> & Readonly<{ children?: ReactNode | undefined }>;
      state: Readonly<S>;
      /**
       * @deprecated
       * https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
       */
      refs: {
          [key: string]: ReactInstance
      };
  }

  class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> { }

  interface ClassicComponent<P = {}, S = {}> extends Component<P, S> {
      replaceState(nextState: S, callback?: () => void): void;
      isMounted(): boolean;
      getInitialState?(): S;
  }

  interface ChildContextProvider<CC> {
      getChildContext(): CC;
  }

  //
  // Class Interfaces
  // ----------------------------------------------------------------------

  /**
   * @deprecated as of recent React versions, function components can no
   * longer be considered 'stateless'. Please use `FunctionComponent` instead.
   *
   * @see [React Hooks](https://reactjs.org/docs/hooks-intro.html)
   */
  type SFC<P = {}> = FunctionComponent<P>;

  /**
   * @deprecated as of recent React versions, function components can no
   * longer be considered 'stateless'. Please use `FunctionComponent` instead.
   *
   * @see [React Hooks](https://reactjs.org/docs/hooks-intro.html)
   */
  type StatelessComponent<P = {}> = FunctionComponent<P>;

  type FC<P = {}> = FunctionComponent<P>;

  interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
      propTypes?: WeakValidationMap<P> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      defaultProps?: Partial<P> | undefined;
      displayName?: string | undefined;
  }

  type VFC<P = {}> = VoidFunctionComponent<P>;

  interface VoidFunctionComponent<P = {}> {
      (props: P, context?: any): ReactElement<any, any> | null;
      propTypes?: WeakValidationMap<P> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      defaultProps?: Partial<P> | undefined;
      displayName?: string | undefined;
  }

  type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;

  interface ForwardRefRenderFunction<T, P = {}> {
      (props: PropsWithChildren<P>, ref: ForwardedRef<T>): ReactElement | null;
      displayName?: string | undefined;
      // explicit rejected with `never` required due to
      // https://github.com/microsoft/TypeScript/issues/36826
      /**
       * defaultProps are not supported on render functions
       */
      defaultProps?: never | undefined;
      /**
       * propTypes are not supported on render functions
       */
      propTypes?: never | undefined;
  }

  /**
   * @deprecated Use ForwardRefRenderFunction. forwardRef doesn't accept a
   *             "real" component.
   */
  interface RefForwardingComponent <T, P = {}> extends ForwardRefRenderFunction<T, P> {}

  interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
      new (props: P, context?: any): Component<P, S>;
      propTypes?: WeakValidationMap<P> | undefined;
      contextType?: Context<any> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      childContextTypes?: ValidationMap<any> | undefined;
      defaultProps?: Partial<P> | undefined;
      displayName?: string | undefined;
  }

  interface ClassicComponentClass<P = {}> extends ComponentClass<P> {
      new (props: P, context?: any): ClassicComponent<P, ComponentState>;
      getDefaultProps?(): P;
  }

  /**
   * We use an intersection type to infer multiple type parameters from
   * a single argument, which is useful for many top-level API defs.
   * See https://github.com/Microsoft/TypeScript/issues/7234 for more info.
   */
  type ClassType<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>> =
      C &
      (new (props: P, context?: any) => T);

  //
  // Component Specs and Lifecycle
  // ----------------------------------------------------------------------

  // This should actually be something like `Lifecycle<P, S> | DeprecatedLifecycle<P, S>`,
  // as React will _not_ call the deprecated lifecycle methods if any of the new lifecycle
  // methods are present.
  interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
      /**
       * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
       */
      componentDidMount?(): void;
      /**
       * Called to determine whether the change in props and state should trigger a re-render.
       *
       * `Component` always returns true.
       * `PureComponent` implements a shallow comparison on props and state and returns true if any
       * props or states have changed.
       *
       * If false is returned, `Component#render`, `componentWillUpdate`
       * and `componentDidUpdate` will not be called.
       */
      shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
      /**
       * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
       * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
       */
      componentWillUnmount?(): void;
      /**
       * Catches exceptions generated in descendant components. Unhandled exceptions will cause
       * the entire component tree to unmount.
       */
      componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
  }

  // Unfortunately, we have no way of declaring that the component constructor must implement this
  interface StaticLifecycle<P, S> {
      getDerivedStateFromProps?: GetDerivedStateFromProps<P, S> | undefined;
      getDerivedStateFromError?: GetDerivedStateFromError<P, S> | undefined;
  }

  type GetDerivedStateFromProps<P, S> =
      /**
       * Returns an update to a component's state based on its new props and old state.
       *
       * Note: its presence prevents any of the deprecated lifecycle methods from being invoked
       */
      (nextProps: Readonly<P>, prevState: S) => Partial<S> | null;

  type GetDerivedStateFromError<P, S> =
      /**
       * This lifecycle is invoked after an error has been thrown by a descendant component.
       * It receives the error that was thrown as a parameter and should return a value to update state.
       *
       * Note: its presence prevents any of the deprecated lifecycle methods from being invoked
       */
      (error: any) => Partial<S> | null;

  // This should be "infer SS" but can't use it yet
  interface NewLifecycle<P, S, SS> {
      /**
       * Runs before React applies the result of `render` to the document, and
       * returns an object to be given to componentDidUpdate. Useful for saving
       * things such as scroll position before `render` causes changes to it.
       *
       * Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
       * lifecycle events from running.
       */
      getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
      /**
       * Called immediately after updating occurs. Not called for the initial render.
       *
       * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
       */
      componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
  }

  interface DeprecatedLifecycle<P, S> {
      /**
       * Called immediately before mounting occurs, and before `Component#render`.
       * Avoid introducing any side-effects or subscriptions in this method.
       *
       * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
       * prevents this from being invoked.
       *
       * @deprecated 16.3, use componentDidMount or the constructor instead; will stop working in React 17
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
       */
      componentWillMount?(): void;
      /**
       * Called immediately before mounting occurs, and before `Component#render`.
       * Avoid introducing any side-effects or subscriptions in this method.
       *
       * This method will not stop working in React 17.
       *
       * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
       * prevents this from being invoked.
       *
       * @deprecated 16.3, use componentDidMount or the constructor instead
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
       */
      UNSAFE_componentWillMount?(): void;
      /**
       * Called when the component may be receiving new props.
       * React may call this even if props have not changed, so be sure to compare new and existing
       * props if you only want to handle changes.
       *
       * Calling `Component#setState` generally does not trigger this method.
       *
       * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
       * prevents this from being invoked.
       *
       * @deprecated 16.3, use static getDerivedStateFromProps instead; will stop working in React 17
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
       */
      componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
      /**
       * Called when the component may be receiving new props.
       * React may call this even if props have not changed, so be sure to compare new and existing
       * props if you only want to handle changes.
       *
       * Calling `Component#setState` generally does not trigger this method.
       *
       * This method will not stop working in React 17.
       *
       * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
       * prevents this from being invoked.
       *
       * @deprecated 16.3, use static getDerivedStateFromProps instead
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
       */
      UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
      /**
       * Called immediately before rendering when new props or state is received. Not called for the initial render.
       *
       * Note: You cannot call `Component#setState` here.
       *
       * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
       * prevents this from being invoked.
       *
       * @deprecated 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
       */
      componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
      /**
       * Called immediately before rendering when new props or state is received. Not called for the initial render.
       *
       * Note: You cannot call `Component#setState` here.
       *
       * This method will not stop working in React 17.
       *
       * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
       * prevents this from being invoked.
       *
       * @deprecated 16.3, use getSnapshotBeforeUpdate instead
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
       * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
       */
      UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
  }

  interface Mixin<P, S> extends ComponentLifecycle<P, S> {
      mixins?: Array<Mixin<P, S>> | undefined;
      statics?: {
          [key: string]: any;
      } | undefined;

      displayName?: string | undefined;
      propTypes?: ValidationMap<any> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      childContextTypes?: ValidationMap<any> | undefined;

      getDefaultProps?(): P;
      getInitialState?(): S;
  }

  interface ComponentSpec<P, S> extends Mixin<P, S> {
      render(): ReactNode;

      [propertyName: string]: any;
  }

  function createRef<T>(): RefObject<T>;

  // will show `ForwardRef(${Component.displayName || Component.name})` in devtools by default,
  // but can be given its own specific name
  interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
      defaultProps?: Partial<P> | undefined;
      propTypes?: WeakValidationMap<P> | undefined;
  }

  function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

  /** Ensures that the props do not include ref at all */
  type PropsWithoutRef<P> =
      // Pick would not be sufficient for this. We'd like to avoid unnecessary mapping and need a distributive conditional to support unions.
      // see: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
      // https://github.com/Microsoft/TypeScript/issues/28339
      P extends any ? ('ref' extends keyof P ? Pick<P, Exclude<keyof P, 'ref'>> : P) : P;
  /** Ensures that the props do not include string ref, which cannot be forwarded */
  type PropsWithRef<P> =
      // Just "P extends { ref?: infer R }" looks sufficient, but R will infer as {} if P is {}.
      'ref' extends keyof P
          ? P extends { ref?: infer R | undefined }
              ? string extends R
                  ? PropsWithoutRef<P> & { ref?: Exclude<R, string> | undefined }
                  : P
              : P
          : P;

  type PropsWithChildren<P> = P & { children?: ReactNode | undefined };

  /**
   * NOTE: prefer ComponentPropsWithRef, if the ref is forwarded,
   * or ComponentPropsWithoutRef when refs are not supported.
   */
  type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
      T extends JSXElementConstructor<infer P>
          ? P
          : T extends keyof JSX.IntrinsicElements
              ? JSX.IntrinsicElements[T]
              : {};
  type ComponentPropsWithRef<T extends ElementType> =
      T extends (new (props: infer P) => Component<any, any>)
          ? PropsWithoutRef<P> & RefAttributes<InstanceType<T>>
          : PropsWithRef<ComponentProps<T>>;
  type ComponentPropsWithoutRef<T extends ElementType> =
      PropsWithoutRef<ComponentProps<T>>;

  type ComponentRef<T extends ElementType> = T extends NamedExoticComponent<
      ComponentPropsWithoutRef<T> & RefAttributes<infer Method>
  >
      ? Method
      : ComponentPropsWithRef<T> extends RefAttributes<infer Method>
          ? Method
          : never;

  // will show `Memo(${Component.displayName || Component.name})` in devtools by default,
  // but can be given its own specific name
  type MemoExoticComponent<T extends ComponentType<any>> = NamedExoticComponent<ComponentPropsWithRef<T>> & {
      readonly type: T;
  };

  function memo<P extends object>(
      Component: FunctionComponent<P>,
      propsAreEqual?: (prevProps: Readonly<PropsWithChildren<P>>, nextProps: Readonly<PropsWithChildren<P>>) => boolean
  ): NamedExoticComponent<P>;
  function memo<T extends ComponentType<any>>(
      Component: T,
      propsAreEqual?: (prevProps: Readonly<ComponentProps<T>>, nextProps: Readonly<ComponentProps<T>>) => boolean
  ): MemoExoticComponent<T>;

  type LazyExoticComponent<T extends ComponentType<any>> = ExoticComponent<ComponentPropsWithRef<T>> & {
      readonly _result: T;
  };

  function lazy<T extends ComponentType<any>>(
      factory: () => Promise<{ default: T }>
  ): LazyExoticComponent<T>;

  //
  // React Hooks
  // ----------------------------------------------------------------------

  // based on the code in https://github.com/facebook/react/pull/13968

  // Unlike the class component setState, the updates are not allowed to be partial
  type SetStateAction<S> = S | ((prevState: S) => S);
  // this technically does accept a second argument, but it's already under a deprecation warning
  // and it's not even released so probably better to not define it.
  type Dispatch<A> = (value: A) => void;
  // Since action _can_ be undefined, dispatch may be called without any parameters.
  type DispatchWithoutAction = () => void;
  // Unlike redux, the actions _can_ be anything
  type Reducer<S, A> = (prevState: S, action: A) => S;
  // If useReducer accepts a reducer without action, dispatch may be called without any parameters.
  type ReducerWithoutAction<S> = (prevState: S) => S;
  // types used to try and prevent the compiler from reducing S
  // to a supertype common with the second argument to useReducer()
  type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
  type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
  // The identity check is done with the SameValue algorithm (Object.is), which is stricter than ===
  type ReducerStateWithoutAction<R extends ReducerWithoutAction<any>> =
      R extends ReducerWithoutAction<infer S> ? S : never;
  // TODO (TypeScript 3.0): ReadonlyArray<unknown>
  type DependencyList = ReadonlyArray<any>;

  // NOTE: callbacks are _only_ allowed to return either void, or a destructor.
  type EffectCallback = () => (void | Destructor);

  interface MutableRefObject<T> {
      current: T;
  }

  // This will technically work if you give a Consumer<T> or Provider<T> but it's deprecated and warns
  /**
   * Accepts a context object (the value returned from `React.createContext`) and returns the current
   * context value, as given by the nearest context provider for the given context.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usecontext
   */
  function useContext<T>(context: Context<T>/*, (not public API) observedBits?: number|boolean */): T;
  /**
   * Returns a stateful value, and a function to update it.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usestate
   */
  function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  // convenience overload when first argument is omitted
  /**
   * Returns a stateful value, and a function to update it.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usestate
   */
  function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  /**
   * An alternative to `useState`.
   *
   * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
   * multiple sub-values. It also lets you optimize performance for components that trigger deep
   * updates because you can pass `dispatch` down instead of callbacks.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usereducer
   */
  // overload where dispatch could accept 0 arguments.
  function useReducer<R extends ReducerWithoutAction<any>, I>(
      reducer: R,
      initializerArg: I,
      initializer: (arg: I) => ReducerStateWithoutAction<R>
  ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
  /**
   * An alternative to `useState`.
   *
   * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
   * multiple sub-values. It also lets you optimize performance for components that trigger deep
   * updates because you can pass `dispatch` down instead of callbacks.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usereducer
   */
  // overload where dispatch could accept 0 arguments.
  function useReducer<R extends ReducerWithoutAction<any>>(
      reducer: R,
      initializerArg: ReducerStateWithoutAction<R>,
      initializer?: undefined
  ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
  /**
   * An alternative to `useState`.
   *
   * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
   * multiple sub-values. It also lets you optimize performance for components that trigger deep
   * updates because you can pass `dispatch` down instead of callbacks.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usereducer
   */
  // overload where "I" may be a subset of ReducerState<R>; used to provide autocompletion.
  // If "I" matches ReducerState<R> exactly then the last overload will allow initializer to be omitted.
  // the last overload effectively behaves as if the identity function (x => x) is the initializer.
  function useReducer<R extends Reducer<any, any>, I>(
      reducer: R,
      initializerArg: I & ReducerState<R>,
      initializer: (arg: I & ReducerState<R>) => ReducerState<R>
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
  /**
   * An alternative to `useState`.
   *
   * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
   * multiple sub-values. It also lets you optimize performance for components that trigger deep
   * updates because you can pass `dispatch` down instead of callbacks.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usereducer
   */
  // overload for free "I"; all goes as long as initializer converts it into "ReducerState<R>".
  function useReducer<R extends Reducer<any, any>, I>(
      reducer: R,
      initializerArg: I,
      initializer: (arg: I) => ReducerState<R>
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
  /**
   * An alternative to `useState`.
   *
   * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
   * multiple sub-values. It also lets you optimize performance for components that trigger deep
   * updates because you can pass `dispatch` down instead of callbacks.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usereducer
   */

  // I'm not sure if I keep this 2-ary or if I make it (2,3)-ary; it's currently (2,3)-ary.
  // The Flow types do have an overload for 3-ary invocation with undefined initializer.

  // NOTE: without the ReducerState indirection, TypeScript would reduce S to be the most common
  // supertype between the reducer's return type and the initialState (or the initializer's return type),
  // which would prevent autocompletion from ever working.

  // TODO: double-check if this weird overload logic is necessary. It is possible it's either a bug
  // in older versions, or a regression in newer versions of the typescript completion service.
  function useReducer<R extends Reducer<any, any>>(
      reducer: R,
      initialState: ReducerState<R>,
      initializer?: undefined
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
  /**
   * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
   * (`initialValue`). The returned object will persist for the full lifetime of the component.
   *
   * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
   * value around similar to how you’d use instance fields in classes.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#useref
   */
  function useRef<T>(initialValue: T): MutableRefObject<T>;
  // convenience overload for refs given as a ref prop as they typically start with a null value
  /**
   * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
   * (`initialValue`). The returned object will persist for the full lifetime of the component.
   *
   * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
   * value around similar to how you’d use instance fields in classes.
   *
   * Usage note: if you need the result of useRef to be directly mutable, include `| null` in the type
   * of the generic argument.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#useref
   */
  function useRef<T>(initialValue: T|null): RefObject<T>;
  // convenience overload for potentially undefined initialValue / call with 0 arguments
  // has a default to stop it from defaulting to {} instead
  /**
   * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
   * (`initialValue`). The returned object will persist for the full lifetime of the component.
   *
   * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
   * value around similar to how you’d use instance fields in classes.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#useref
   */
  function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  /**
   * The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations.
   * Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside
   * `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.
   *
   * Prefer the standard `useEffect` when possible to avoid blocking visual updates.
   *
   * If you’re migrating code from a class component, `useLayoutEffect` fires in the same phase as
   * `componentDidMount` and `componentDidUpdate`.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
   */
  function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
  /**
   * Accepts a function that contains imperative, possibly effectful code.
   *
   * @param effect Imperative function that can return a cleanup function
   * @param deps If present, effect will only activate if the values in the list change.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#useeffect
   */
  function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  // NOTE: this does not accept strings, but this will have to be fixed by removing strings from type Ref<T>
  /**
   * `useImperativeHandle` customizes the instance value that is exposed to parent components when using
   * `ref`. As always, imperative code using refs should be avoided in most cases.
   *
   * `useImperativeHandle` should be used with `React.forwardRef`.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#useimperativehandle
   */
  function useImperativeHandle<T, R extends T>(ref: Ref<T>|undefined, init: () => R, deps?: DependencyList): void;
  // I made 'inputs' required here and in useMemo as there's no point to memoizing without the memoization key
  // useCallback(X) is identical to just using X, useMemo(() => Y) is identical to just using Y.
  /**
   * `useCallback` will return a memoized version of the callback that only changes if one of the `inputs`
   * has changed.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usecallback
   */
  // TODO (TypeScript 3.0): <T extends (...args: never[]) => unknown>
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
  /**
   * `useMemo` will only recompute the memoized value when one of the `deps` has changed.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usememo
   */
  // allow undefined, but don't make it optional as that is very likely a mistake
  function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
  /**
   * `useDebugValue` can be used to display a label for custom hooks in React DevTools.
   *
   * NOTE: We don’t recommend adding debug values to every custom hook.
   * It’s most valuable for custom hooks that are part of shared libraries.
   *
   * @version 16.8.0
   * @see https://reactjs.org/docs/hooks-reference.html#usedebugvalue
   */
  // the name of the custom hook is itself derived from the function name at runtime:
  // it's just the function name without the "use" prefix.
  function useDebugValue<T>(value: T, format?: (value: T) => any): void;

  //
  // Event System
  // ----------------------------------------------------------------------
  // TODO: change any to unknown when moving to TS v3
  interface BaseSyntheticEvent<E = object, C = any, T = any> {
      nativeEvent: E;
      currentTarget: C;
      target: T;
      bubbles: boolean;
      cancelable: boolean;
      defaultPrevented: boolean;
      eventPhase: number;
      isTrusted: boolean;
      preventDefault(): void;
      isDefaultPrevented(): boolean;
      stopPropagation(): void;
      isPropagationStopped(): boolean;
      persist(): void;
      timeStamp: number;
      type: string;
  }

  /**
   * currentTarget - a reference to the element on which the event listener is registered.
   *
   * target - a reference to the element from which the event was originally dispatched.
   * This might be a child element to the element on which the event listener is registered.
   * If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
   */
  interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}

  interface ClipboardEvent<T = Element> extends SyntheticEvent<T, NativeClipboardEvent> {
      clipboardData: DataTransfer;
  }

  interface CompositionEvent<T = Element> extends SyntheticEvent<T, NativeCompositionEvent> {
      data: string;
  }

  interface DragEvent<T = Element> extends MouseEvent<T, NativeDragEvent> {
      dataTransfer: DataTransfer;
  }

  interface PointerEvent<T = Element> extends MouseEvent<T, NativePointerEvent> {
      pointerId: number;
      pressure: number;
      tangentialPressure: number;
      tiltX: number;
      tiltY: number;
      twist: number;
      width: number;
      height: number;
      pointerType: 'mouse' | 'pen' | 'touch';
      isPrimary: boolean;
  }

  interface FocusEvent<Target = Element, RelatedTarget = Element> extends SyntheticEvent<Target, NativeFocusEvent> {
      relatedTarget: (EventTarget & RelatedTarget) | null;
      target: EventTarget & Target;
  }

  interface FormEvent<T = Element> extends SyntheticEvent<T> {
  }

  interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
      target: EventTarget & T;
  }

  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
      target: EventTarget & T;
  }

  interface KeyboardEvent<T = Element> extends UIEvent<T, NativeKeyboardEvent> {
      altKey: boolean;
      /** @deprecated */
      charCode: number;
      ctrlKey: boolean;
      code: string;
      /**
       * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
       */
      getModifierState(key: string): boolean;
      /**
       * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
       */
      key: string;
      /** @deprecated */
      keyCode: number;
      locale: string;
      location: number;
      metaKey: boolean;
      repeat: boolean;
      shiftKey: boolean;
      /** @deprecated */
      which: number;
  }

  interface MouseEvent<T = Element, E = NativeMouseEvent> extends UIEvent<T, E> {
      altKey: boolean;
      button: number;
      buttons: number;
      clientX: number;
      clientY: number;
      ctrlKey: boolean;
      /**
       * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
       */
      getModifierState(key: string): boolean;
      metaKey: boolean;
      movementX: number;
      movementY: number;
      pageX: number;
      pageY: number;
      relatedTarget: EventTarget | null;
      screenX: number;
      screenY: number;
      shiftKey: boolean;
  }

  interface TouchEvent<T = Element> extends UIEvent<T, NativeTouchEvent> {
      altKey: boolean;
      changedTouches: TouchList;
      ctrlKey: boolean;
      /**
       * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
       */
      getModifierState(key: string): boolean;
      metaKey: boolean;
      shiftKey: boolean;
      targetTouches: TouchList;
      touches: TouchList;
  }

  interface UIEvent<T = Element, E = NativeUIEvent> extends SyntheticEvent<T, E> {
      detail: number;
      view: AbstractView;
  }

  interface WheelEvent<T = Element> extends MouseEvent<T, NativeWheelEvent> {
      deltaMode: number;
      deltaX: number;
      deltaY: number;
      deltaZ: number;
  }

  interface AnimationEvent<T = Element> extends SyntheticEvent<T, NativeAnimationEvent> {
      animationName: string;
      elapsedTime: number;
      pseudoElement: string;
  }

  interface TransitionEvent<T = Element> extends SyntheticEvent<T, NativeTransitionEvent> {
      elapsedTime: number;
      propertyName: string;
      pseudoElement: string;
  }

  //
  // Event Handler Types
  // ----------------------------------------------------------------------

  type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];

  type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;

  type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
  type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
  type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
  type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
  type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
  type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
  type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
  type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
  type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
  type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
  type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
  type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
  type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
  type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;

  //
  // Props / DOM Attributes
  // ----------------------------------------------------------------------

  /**
   * @deprecated. This was used to allow clients to pass `ref` and `key`
   * to `createElement`, which is no longer necessary due to intersection
   * types. If you need to declare a props object before passing it to
   * `createElement` or a factory, use `ClassAttributes<T>`:
   *
   * ```ts
   * var b: Button | null;
   * var props: ButtonProps & ClassAttributes<Button> = {
   *     ref: b => button = b, // ok!
   *     label: "I'm a Button"
   * };
   * ```
   */
  interface Props<T> {
      children?: ReactNode | undefined;
      key?: Key | undefined;
      ref?: LegacyRef<T> | undefined;
  }

  interface HTMLProps<T> extends AllHTMLAttributes<T>, ClassAttributes<T> {
  }

  type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;

  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
  }

  interface DOMAttributes<T> {
      children?: ReactNode | undefined;
      dangerouslySetInnerHTML?: {
          __html: string;
      } | undefined;

      // Clipboard Events
      onCopy?: ClipboardEventHandler<T> | undefined;
      onCopyCapture?: ClipboardEventHandler<T> | undefined;
      onCut?: ClipboardEventHandler<T> | undefined;
      onCutCapture?: ClipboardEventHandler<T> | undefined;
      onPaste?: ClipboardEventHandler<T> | undefined;
      onPasteCapture?: ClipboardEventHandler<T> | undefined;

      // Composition Events
      onCompositionEnd?: CompositionEventHandler<T> | undefined;
      onCompositionEndCapture?: CompositionEventHandler<T> | undefined;
      onCompositionStart?: CompositionEventHandler<T> | undefined;
      onCompositionStartCapture?: CompositionEventHandler<T> | undefined;
      onCompositionUpdate?: CompositionEventHandler<T> | undefined;
      onCompositionUpdateCapture?: CompositionEventHandler<T> | undefined;

      // Focus Events
      onFocus?: FocusEventHandler<T> | undefined;
      onFocusCapture?: FocusEventHandler<T> | undefined;
      onBlur?: FocusEventHandler<T> | undefined;
      onBlurCapture?: FocusEventHandler<T> | undefined;

      // Form Events
      onChange?: FormEventHandler<T> | undefined;
      onChangeCapture?: FormEventHandler<T> | undefined;
      onBeforeInput?: FormEventHandler<T> | undefined;
      onBeforeInputCapture?: FormEventHandler<T> | undefined;
      onInput?: FormEventHandler<T> | undefined;
      onInputCapture?: FormEventHandler<T> | undefined;
      onReset?: FormEventHandler<T> | undefined;
      onResetCapture?: FormEventHandler<T> | undefined;
      onSubmit?: FormEventHandler<T> | undefined;
      onSubmitCapture?: FormEventHandler<T> | undefined;
      onInvalid?: FormEventHandler<T> | undefined;
      onInvalidCapture?: FormEventHandler<T> | undefined;

      // Image Events
      onLoad?: ReactEventHandler<T> | undefined;
      onLoadCapture?: ReactEventHandler<T> | undefined;
      onError?: ReactEventHandler<T> | undefined; // also a Media Event
      onErrorCapture?: ReactEventHandler<T> | undefined; // also a Media Event

      // Keyboard Events
      onKeyDown?: KeyboardEventHandler<T> | undefined;
      onKeyDownCapture?: KeyboardEventHandler<T> | undefined;
      /** @deprecated */
      onKeyPress?: KeyboardEventHandler<T> | undefined;
      /** @deprecated */
      onKeyPressCapture?: KeyboardEventHandler<T> | undefined;
      onKeyUp?: KeyboardEventHandler<T> | undefined;
      onKeyUpCapture?: KeyboardEventHandler<T> | undefined;

      // Media Events
      onAbort?: ReactEventHandler<T> | undefined;
      onAbortCapture?: ReactEventHandler<T> | undefined;
      onCanPlay?: ReactEventHandler<T> | undefined;
      onCanPlayCapture?: ReactEventHandler<T> | undefined;
      onCanPlayThrough?: ReactEventHandler<T> | undefined;
      onCanPlayThroughCapture?: ReactEventHandler<T> | undefined;
      onDurationChange?: ReactEventHandler<T> | undefined;
      onDurationChangeCapture?: ReactEventHandler<T> | undefined;
      onEmptied?: ReactEventHandler<T> | undefined;
      onEmptiedCapture?: ReactEventHandler<T> | undefined;
      onEncrypted?: ReactEventHandler<T> | undefined;
      onEncryptedCapture?: ReactEventHandler<T> | undefined;
      onEnded?: ReactEventHandler<T> | undefined;
      onEndedCapture?: ReactEventHandler<T> | undefined;
      onLoadedData?: ReactEventHandler<T> | undefined;
      onLoadedDataCapture?: ReactEventHandler<T> | undefined;
      onLoadedMetadata?: ReactEventHandler<T> | undefined;
      onLoadedMetadataCapture?: ReactEventHandler<T> | undefined;
      onLoadStart?: ReactEventHandler<T> | undefined;
      onLoadStartCapture?: ReactEventHandler<T> | undefined;
      onPause?: ReactEventHandler<T> | undefined;
      onPauseCapture?: ReactEventHandler<T> | undefined;
      onPlay?: ReactEventHandler<T> | undefined;
      onPlayCapture?: ReactEventHandler<T> | undefined;
      onPlaying?: ReactEventHandler<T> | undefined;
      onPlayingCapture?: ReactEventHandler<T> | undefined;
      onProgress?: ReactEventHandler<T> | undefined;
      onProgressCapture?: ReactEventHandler<T> | undefined;
      onRateChange?: ReactEventHandler<T> | undefined;
      onRateChangeCapture?: ReactEventHandler<T> | undefined;
      onSeeked?: ReactEventHandler<T> | undefined;
      onSeekedCapture?: ReactEventHandler<T> | undefined;
      onSeeking?: ReactEventHandler<T> | undefined;
      onSeekingCapture?: ReactEventHandler<T> | undefined;
      onStalled?: ReactEventHandler<T> | undefined;
      onStalledCapture?: ReactEventHandler<T> | undefined;
      onSuspend?: ReactEventHandler<T> | undefined;
      onSuspendCapture?: ReactEventHandler<T> | undefined;
      onTimeUpdate?: ReactEventHandler<T> | undefined;
      onTimeUpdateCapture?: ReactEventHandler<T> | undefined;
      onVolumeChange?: ReactEventHandler<T> | undefined;
      onVolumeChangeCapture?: ReactEventHandler<T> | undefined;
      onWaiting?: ReactEventHandler<T> | undefined;
      onWaitingCapture?: ReactEventHandler<T> | undefined;

      // MouseEvents
      onAuxClick?: MouseEventHandler<T> | undefined;
      onAuxClickCapture?: MouseEventHandler<T> | undefined;
      onClick?: MouseEventHandler<T> | undefined;
      onClickCapture?: MouseEventHandler<T> | undefined;
      onContextMenu?: MouseEventHandler<T> | undefined;
      onContextMenuCapture?: MouseEventHandler<T> | undefined;
      onDoubleClick?: MouseEventHandler<T> | undefined;
      onDoubleClickCapture?: MouseEventHandler<T> | undefined;
      onDrag?: DragEventHandler<T> | undefined;
      onDragCapture?: DragEventHandler<T> | undefined;
      onDragEnd?: DragEventHandler<T> | undefined;
      onDragEndCapture?: DragEventHandler<T> | undefined;
      onDragEnter?: DragEventHandler<T> | undefined;
      onDragEnterCapture?: DragEventHandler<T> | undefined;
      onDragExit?: DragEventHandler<T> | undefined;
      onDragExitCapture?: DragEventHandler<T> | undefined;
      onDragLeave?: DragEventHandler<T> | undefined;
      onDragLeaveCapture?: DragEventHandler<T> | undefined;
      onDragOver?: DragEventHandler<T> | undefined;
      onDragOverCapture?: DragEventHandler<T> | undefined;
      onDragStart?: DragEventHandler<T> | undefined;
      onDragStartCapture?: DragEventHandler<T> | undefined;
      onDrop?: DragEventHandler<T> | undefined;
      onDropCapture?: DragEventHandler<T> | undefined;
      onMouseDown?: MouseEventHandler<T> | undefined;
      onMouseDownCapture?: MouseEventHandler<T> | undefined;
      onMouseEnter?: MouseEventHandler<T> | undefined;
      onMouseLeave?: MouseEventHandler<T> | undefined;
      onMouseMove?: MouseEventHandler<T> | undefined;
      onMouseMoveCapture?: MouseEventHandler<T> | undefined;
      onMouseOut?: MouseEventHandler<T> | undefined;
      onMouseOutCapture?: MouseEventHandler<T> | undefined;
      onMouseOver?: MouseEventHandler<T> | undefined;
      onMouseOverCapture?: MouseEventHandler<T> | undefined;
      onMouseUp?: MouseEventHandler<T> | undefined;
      onMouseUpCapture?: MouseEventHandler<T> | undefined;

      // Selection Events
      onSelect?: ReactEventHandler<T> | undefined;
      onSelectCapture?: ReactEventHandler<T> | undefined;

      // Touch Events
      onTouchCancel?: TouchEventHandler<T> | undefined;
      onTouchCancelCapture?: TouchEventHandler<T> | undefined;
      onTouchEnd?: TouchEventHandler<T> | undefined;
      onTouchEndCapture?: TouchEventHandler<T> | undefined;
      onTouchMove?: TouchEventHandler<T> | undefined;
      onTouchMoveCapture?: TouchEventHandler<T> | undefined;
      onTouchStart?: TouchEventHandler<T> | undefined;
      onTouchStartCapture?: TouchEventHandler<T> | undefined;

      // Pointer Events
      onPointerDown?: PointerEventHandler<T> | undefined;
      onPointerDownCapture?: PointerEventHandler<T> | undefined;
      onPointerMove?: PointerEventHandler<T> | undefined;
      onPointerMoveCapture?: PointerEventHandler<T> | undefined;
      onPointerUp?: PointerEventHandler<T> | undefined;
      onPointerUpCapture?: PointerEventHandler<T> | undefined;
      onPointerCancel?: PointerEventHandler<T> | undefined;
      onPointerCancelCapture?: PointerEventHandler<T> | undefined;
      onPointerEnter?: PointerEventHandler<T> | undefined;
      onPointerEnterCapture?: PointerEventHandler<T> | undefined;
      onPointerLeave?: PointerEventHandler<T> | undefined;
      onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
      onPointerOver?: PointerEventHandler<T> | undefined;
      onPointerOverCapture?: PointerEventHandler<T> | undefined;
      onPointerOut?: PointerEventHandler<T> | undefined;
      onPointerOutCapture?: PointerEventHandler<T> | undefined;
      onGotPointerCapture?: PointerEventHandler<T> | undefined;
      onGotPointerCaptureCapture?: PointerEventHandler<T> | undefined;
      onLostPointerCapture?: PointerEventHandler<T> | undefined;
      onLostPointerCaptureCapture?: PointerEventHandler<T> | undefined;

      // UI Events
      onScroll?: UIEventHandler<T> | undefined;
      onScrollCapture?: UIEventHandler<T> | undefined;

      // Wheel Events
      onWheel?: WheelEventHandler<T> | undefined;
      onWheelCapture?: WheelEventHandler<T> | undefined;

      // Animation Events
      onAnimationStart?: AnimationEventHandler<T> | undefined;
      onAnimationStartCapture?: AnimationEventHandler<T> | undefined;
      onAnimationEnd?: AnimationEventHandler<T> | undefined;
      onAnimationEndCapture?: AnimationEventHandler<T> | undefined;
      onAnimationIteration?: AnimationEventHandler<T> | undefined;
      onAnimationIterationCapture?: AnimationEventHandler<T> | undefined;

      // Transition Events
      onTransitionEnd?: TransitionEventHandler<T> | undefined;
      onTransitionEndCapture?: TransitionEventHandler<T> | undefined;
  }

  export interface CSSProperties extends CSS.Properties<string | number> {
      /**
       * The index signature was removed to enable closed typing for style
       * using CSSType. You're able to use type assertion or module augmentation
       * to add properties or an index signature of your own.
       *
       * For examples and more information, visit:
       * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
       */
  }

  // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
  interface AriaAttributes {
      /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
      'aria-activedescendant'?: string | undefined;
      /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
      'aria-atomic'?: Booleanish | undefined;
      /**
       * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
       * presented if they are made.
       */
      'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
      /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
      'aria-busy'?: Booleanish | undefined;
      /**
       * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
       * @see aria-pressed @see aria-selected.
       */
      'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
      /**
       * Defines the total number of columns in a table, grid, or treegrid.
       * @see aria-colindex.
       */
      'aria-colcount'?: number | undefined;
      /**
       * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
       * @see aria-colcount @see aria-colspan.
       */
      'aria-colindex'?: number | undefined;
      /**
       * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-colindex @see aria-rowspan.
       */
      'aria-colspan'?: number | undefined;
      /**
       * Identifies the element (or elements) whose contents or presence are controlled by the current element.
       * @see aria-owns.
       */
      'aria-controls'?: string | undefined;
      /** Indicates the element that represents the current item within a container or set of related elements. */
      'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
      /**
       * Identifies the element (or elements) that describes the object.
       * @see aria-labelledby
       */
      'aria-describedby'?: string | undefined;
      /**
       * Identifies the element that provides a detailed, extended description for the object.
       * @see aria-describedby.
       */
      'aria-details'?: string | undefined;
      /**
       * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
       * @see aria-hidden @see aria-readonly.
       */
      'aria-disabled'?: Booleanish | undefined;
      /**
       * Indicates what functions can be performed when a dragged object is released on the drop target.
       * @deprecated in ARIA 1.1
       */
      'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined;
      /**
       * Identifies the element that provides an error message for the object.
       * @see aria-invalid @see aria-describedby.
       */
      'aria-errormessage'?: string | undefined;
      /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
      'aria-expanded'?: Booleanish | undefined;
      /**
       * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
       * allows assistive technology to override the general default of reading in document source order.
       */
      'aria-flowto'?: string | undefined;
      /**
       * Indicates an element's "grabbed" state in a drag-and-drop operation.
       * @deprecated in ARIA 1.1
       */
      'aria-grabbed'?: Booleanish | undefined;
      /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
      'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
      /**
       * Indicates whether the element is exposed to an accessibility API.
       * @see aria-disabled.
       */
      'aria-hidden'?: Booleanish | undefined;
      /**
       * Indicates the entered value does not conform to the format expected by the application.
       * @see aria-errormessage.
       */
      'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
      /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
      'aria-keyshortcuts'?: string | undefined;
      /**
       * Defines a string value that labels the current element.
       * @see aria-labelledby.
       */
      'aria-label'?: string | undefined;
      /**
       * Identifies the element (or elements) that labels the current element.
       * @see aria-describedby.
       */
      'aria-labelledby'?: string | undefined;
      /** Defines the hierarchical level of an element within a structure. */
      'aria-level'?: number | undefined;
      /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
      'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
      /** Indicates whether an element is modal when displayed. */
      'aria-modal'?: Booleanish | undefined;
      /** Indicates whether a text box accepts multiple lines of input or only a single line. */
      'aria-multiline'?: Booleanish | undefined;
      /** Indicates that the user may select more than one item from the current selectable descendants. */
      'aria-multiselectable'?: Booleanish | undefined;
      /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
      'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
      /**
       * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
       * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
       * @see aria-controls.
       */
      'aria-owns'?: string | undefined;
      /**
       * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
       * A hint could be a sample value or a brief description of the expected format.
       */
      'aria-placeholder'?: string | undefined;
      /**
       * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-setsize.
       */
      'aria-posinset'?: number | undefined;
      /**
       * Indicates the current "pressed" state of toggle buttons.
       * @see aria-checked @see aria-selected.
       */
      'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
      /**
       * Indicates that the element is not editable, but is otherwise operable.
       * @see aria-disabled.
       */
      'aria-readonly'?: Booleanish | undefined;
      /**
       * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
       * @see aria-atomic.
       */
      'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals' | undefined;
      /** Indicates that user input is required on the element before a form may be submitted. */
      'aria-required'?: Booleanish | undefined;
      /** Defines a human-readable, author-localized description for the role of an element. */
      'aria-roledescription'?: string | undefined;
      /**
       * Defines the total number of rows in a table, grid, or treegrid.
       * @see aria-rowindex.
       */
      'aria-rowcount'?: number | undefined;
      /**
       * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
       * @see aria-rowcount @see aria-rowspan.
       */
      'aria-rowindex'?: number | undefined;
      /**
       * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
       * @see aria-rowindex @see aria-colspan.
       */
      'aria-rowspan'?: number | undefined;
      /**
       * Indicates the current "selected" state of various widgets.
       * @see aria-checked @see aria-pressed.
       */
      'aria-selected'?: Booleanish | undefined;
      /**
       * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
       * @see aria-posinset.
       */
      'aria-setsize'?: number | undefined;
      /** Indicates if items in a table or grid are sorted in ascending or descending order. */
      'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined;
      /** Defines the maximum allowed value for a range widget. */
      'aria-valuemax'?: number | undefined;
      /** Defines the minimum allowed value for a range widget. */
      'aria-valuemin'?: number | undefined;
      /**
       * Defines the current value for a range widget.
       * @see aria-valuetext.
       */
      'aria-valuenow'?: number | undefined;
      /** Defines the human readable text alternative of aria-valuenow for a range widget. */
      'aria-valuetext'?: string | undefined;
  }

  // All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
  type AriaRole =
      | 'alert'
      | 'alertdialog'
      | 'application'
      | 'article'
      | 'banner'
      | 'button'
      | 'cell'
      | 'checkbox'
      | 'columnheader'
      | 'combobox'
      | 'complementary'
      | 'contentinfo'
      | 'definition'
      | 'dialog'
      | 'directory'
      | 'document'
      | 'feed'
      | 'figure'
      | 'form'
      | 'grid'
      | 'gridcell'
      | 'group'
      | 'heading'
      | 'img'
      | 'link'
      | 'list'
      | 'listbox'
      | 'listitem'
      | 'log'
      | 'main'
      | 'marquee'
      | 'math'
      | 'menu'
      | 'menubar'
      | 'menuitem'
      | 'menuitemcheckbox'
      | 'menuitemradio'
      | 'navigation'
      | 'none'
      | 'note'
      | 'option'
      | 'presentation'
      | 'progressbar'
      | 'radio'
      | 'radiogroup'
      | 'region'
      | 'row'
      | 'rowgroup'
      | 'rowheader'
      | 'scrollbar'
      | 'search'
      | 'searchbox'
      | 'separator'
      | 'slider'
      | 'spinbutton'
      | 'status'
      | 'switch'
      | 'tab'
      | 'table'
      | 'tablist'
      | 'tabpanel'
      | 'term'
      | 'textbox'
      | 'timer'
      | 'toolbar'
      | 'tooltip'
      | 'tree'
      | 'treegrid'
      | 'treeitem'
      | (string & {});

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // React-specific Attributes
      defaultChecked?: boolean | undefined;
      defaultValue?: string | number | ReadonlyArray<string> | undefined;
      suppressContentEditableWarning?: boolean | undefined;
      suppressHydrationWarning?: boolean | undefined;

      // Standard HTML Attributes
      accessKey?: string | undefined;
      className?: string | undefined;
      contentEditable?: Booleanish | "inherit" | undefined;
      contextMenu?: string | undefined;
      dir?: string | undefined;
      draggable?: Booleanish | undefined;
      hidden?: boolean | undefined;
      id?: string | undefined;
      lang?: string | undefined;
      placeholder?: string | undefined;
      slot?: string | undefined;
      spellCheck?: Booleanish | undefined;
      style?: CSSProperties | undefined;
      tabIndex?: number | undefined;
      title?: string | undefined;
      translate?: 'yes' | 'no' | undefined;

      // Unknown
      radioGroup?: string | undefined; // <command>, <menuitem>

      // WAI-ARIA
      role?: AriaRole | undefined;

      // RDFa Attributes
      about?: string | undefined;
      datatype?: string | undefined;
      inlist?: any;
      prefix?: string | undefined;
      property?: string | undefined;
      resource?: string | undefined;
      typeof?: string | undefined;
      vocab?: string | undefined;

      // Non-standard Attributes
      autoCapitalize?: string | undefined;
      autoCorrect?: string | undefined;
      autoSave?: string | undefined;
      color?: string | undefined;
      itemProp?: string | undefined;
      itemScope?: boolean | undefined;
      itemType?: string | undefined;
      itemID?: string | undefined;
      itemRef?: string | undefined;
      results?: number | undefined;
      security?: string | undefined;
      unselectable?: 'on' | 'off' | undefined;

      // Living Standard
      /**
       * Hints at the type of data that might be entered by the user while editing the element or its contents
       * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
       */
      inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
      /**
       * Specify that a standard HTML element should behave like a defined custom built-in element
       * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
       */
      is?: string | undefined;
  }

  interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
      // Standard HTML Attributes
      accept?: string | undefined;
      acceptCharset?: string | undefined;
      action?: string | undefined;
      allowFullScreen?: boolean | undefined;
      allowTransparency?: boolean | undefined;
      alt?: string | undefined;
      as?: string | undefined;
      async?: boolean | undefined;
      autoComplete?: string | undefined;
      autoFocus?: boolean | undefined;
      autoPlay?: boolean | undefined;
      capture?: boolean | 'user' | 'environment' | undefined;
      cellPadding?: number | string | undefined;
      cellSpacing?: number | string | undefined;
      charSet?: string | undefined;
      challenge?: string | undefined;
      checked?: boolean | undefined;
      cite?: string | undefined;
      classID?: string | undefined;
      cols?: number | undefined;
      colSpan?: number | undefined;
      content?: string | undefined;
      controls?: boolean | undefined;
      coords?: string | undefined;
      crossOrigin?: string | undefined;
      data?: string | undefined;
      dateTime?: string | undefined;
      default?: boolean | undefined;
      defer?: boolean | undefined;
      disabled?: boolean | undefined;
      download?: any;
      encType?: string | undefined;
      form?: string | undefined;
      formAction?: string | undefined;
      formEncType?: string | undefined;
      formMethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formTarget?: string | undefined;
      frameBorder?: number | string | undefined;
      headers?: string | undefined;
      height?: number | string | undefined;
      high?: number | undefined;
      href?: string | undefined;
      hrefLang?: string | undefined;
      htmlFor?: string | undefined;
      httpEquiv?: string | undefined;
      integrity?: string | undefined;
      keyParams?: string | undefined;
      keyType?: string | undefined;
      kind?: string | undefined;
      label?: string | undefined;
      list?: string | undefined;
      loop?: boolean | undefined;
      low?: number | undefined;
      manifest?: string | undefined;
      marginHeight?: number | undefined;
      marginWidth?: number | undefined;
      max?: number | string | undefined;
      maxLength?: number | undefined;
      media?: string | undefined;
      mediaGroup?: string | undefined;
      method?: string | undefined;
      min?: number | string | undefined;
      minLength?: number | undefined;
      multiple?: boolean | undefined;
      muted?: boolean | undefined;
      name?: string | undefined;
      nonce?: string | undefined;
      noValidate?: boolean | undefined;
      open?: boolean | undefined;
      optimum?: number | undefined;
      pattern?: string | undefined;
      placeholder?: string | undefined;
      playsInline?: boolean | undefined;
      poster?: string | undefined;
      preload?: string | undefined;
      readOnly?: boolean | undefined;
      rel?: string | undefined;
      required?: boolean | undefined;
      reversed?: boolean | undefined;
      rows?: number | undefined;
      rowSpan?: number | undefined;
      sandbox?: string | undefined;
      scope?: string | undefined;
      scoped?: boolean | undefined;
      scrolling?: string | undefined;
      seamless?: boolean | undefined;
      selected?: boolean | undefined;
      shape?: string | undefined;
      size?: number | undefined;
      sizes?: string | undefined;
      span?: number | undefined;
      src?: string | undefined;
      srcDoc?: string | undefined;
      srcLang?: string | undefined;
      srcSet?: string | undefined;
      start?: number | undefined;
      step?: number | string | undefined;
      summary?: string | undefined;
      target?: string | undefined;
      type?: string | undefined;
      useMap?: string | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
      width?: number | string | undefined;
      wmode?: string | undefined;
      wrap?: string | undefined;
  }

  type HTMLAttributeReferrerPolicy =
      | ''
      | 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url';

  type HTMLAttributeAnchorTarget =
      | '_self'
      | '_blank'
      | '_parent'
      | '_top'
      | (string & {});

  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
      download?: any;
      href?: string | undefined;
      hrefLang?: string | undefined;
      media?: string | undefined;
      ping?: string | undefined;
      rel?: string | undefined;
      target?: HTMLAttributeAnchorTarget | undefined;
      type?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  }

  interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

  interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
      alt?: string | undefined;
      coords?: string | undefined;
      download?: any;
      href?: string | undefined;
      hrefLang?: string | undefined;
      media?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      rel?: string | undefined;
      shape?: string | undefined;
      target?: string | undefined;
  }

  interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
      href?: string | undefined;
      target?: string | undefined;
  }

  interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
      autoFocus?: boolean | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      formAction?: string | undefined;
      formEncType?: string | undefined;
      formMethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formTarget?: string | undefined;
      name?: string | undefined;
      type?: 'submit' | 'reset' | 'button' | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
      height?: number | string | undefined;
      width?: number | string | undefined;
  }

  interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
      span?: number | undefined;
      width?: number | string | undefined;
  }

  interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
      span?: number | undefined;
  }

  interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
      value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
      open?: boolean | undefined;
      onToggle?: ReactEventHandler<T> | undefined;
  }

  interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
      dateTime?: string | undefined;
  }

  interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
      onCancel?: ReactEventHandler<T> |  undefined;
      onClose?: ReactEventHandler<T> |  undefined;
      open?: boolean | undefined;
  }

  interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
      height?: number | string | undefined;
      src?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;
  }

  interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean | undefined;
      form?: string | undefined;
      name?: string | undefined;
  }

  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
      acceptCharset?: string | undefined;
      action?: string | undefined;
      autoComplete?: string | undefined;
      encType?: string | undefined;
      method?: string | undefined;
      name?: string | undefined;
      noValidate?: boolean | undefined;
      target?: string | undefined;
  }

  interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
      manifest?: string | undefined;
  }

  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
      allow?: string | undefined;
      allowFullScreen?: boolean | undefined;
      allowTransparency?: boolean | undefined;
      /** @deprecated */
      frameBorder?: number | string | undefined;
      height?: number | string | undefined;
      loading?: "eager" | "lazy" | undefined;
      /** @deprecated */
      marginHeight?: number | undefined;
      /** @deprecated */
      marginWidth?: number | undefined;
      name?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      sandbox?: string | undefined;
      /** @deprecated */
      scrolling?: string | undefined;
      seamless?: boolean | undefined;
      src?: string | undefined;
      srcDoc?: string | undefined;
      width?: number | string | undefined;
  }

  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
      alt?: string | undefined;
      crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
      decoding?: "async" | "auto" | "sync" | undefined;
      height?: number | string | undefined;
      loading?: "eager" | "lazy" | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      sizes?: string | undefined;
      src?: string | undefined;
      srcSet?: string | undefined;
      useMap?: string | undefined;
      width?: number | string | undefined;
  }

  interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
      dateTime?: string | undefined;
  }

  type HTMLInputTypeAttribute =
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'radio'
      | 'range'
      | 'reset'
      | 'search'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
      | (string & {});

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
      accept?: string | undefined;
      alt?: string | undefined;
      autoComplete?: string | undefined;
      autoFocus?: boolean | undefined;
      capture?: boolean | 'user' | 'environment' | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
      checked?: boolean | undefined;
      crossOrigin?: string | undefined;
      disabled?: boolean | undefined;
      enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
      form?: string | undefined;
      formAction?: string | undefined;
      formEncType?: string | undefined;
      formMethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formTarget?: string | undefined;
      height?: number | string | undefined;
      list?: string | undefined;
      max?: number | string | undefined;
      maxLength?: number | undefined;
      min?: number | string | undefined;
      minLength?: number | undefined;
      multiple?: boolean | undefined;
      name?: string | undefined;
      pattern?: string | undefined;
      placeholder?: string | undefined;
      readOnly?: boolean | undefined;
      required?: boolean | undefined;
      size?: number | undefined;
      src?: string | undefined;
      step?: number | string | undefined;
      type?: HTMLInputTypeAttribute | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
      width?: number | string | undefined;

      onChange?: ChangeEventHandler<T> | undefined;
  }

  interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
      autoFocus?: boolean | undefined;
      challenge?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      keyType?: string | undefined;
      keyParams?: string | undefined;
      name?: string | undefined;
  }

  interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
      form?: string | undefined;
      htmlFor?: string | undefined;
  }

  interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
      value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
      as?: string | undefined;
      crossOrigin?: string | undefined;
      href?: string | undefined;
      hrefLang?: string | undefined;
      integrity?: string | undefined;
      media?: string | undefined;
      imageSrcSet?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      rel?: string | undefined;
      sizes?: string | undefined;
      type?: string | undefined;
      charSet?: string | undefined;
  }

  interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
      name?: string | undefined;
  }

  interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
      type?: string | undefined;
  }

  interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
      autoPlay?: boolean | undefined;
      controls?: boolean | undefined;
      controlsList?: string | undefined;
      crossOrigin?: string | undefined;
      loop?: boolean | undefined;
      mediaGroup?: string | undefined;
      muted?: boolean | undefined;
      playsInline?: boolean | undefined;
      preload?: string | undefined;
      src?: string | undefined;
  }

  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
      charSet?: string | undefined;
      content?: string | undefined;
      httpEquiv?: string | undefined;
      name?: string | undefined;
      media?: string | undefined;
  }

  interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
      form?: string | undefined;
      high?: number | undefined;
      low?: number | undefined;
      max?: number | string | undefined;
      min?: number | string | undefined;
      optimum?: number | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
      cite?: string | undefined;
  }

  interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
      classID?: string | undefined;
      data?: string | undefined;
      form?: string | undefined;
      height?: number | string | undefined;
      name?: string | undefined;
      type?: string | undefined;
      useMap?: string | undefined;
      width?: number | string | undefined;
      wmode?: string | undefined;
  }

  interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
      reversed?: boolean | undefined;
      start?: number | undefined;
      type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
  }

  interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean | undefined;
      label?: string | undefined;
  }

  interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean | undefined;
      label?: string | undefined;
      selected?: boolean | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
      form?: string | undefined;
      htmlFor?: string | undefined;
      name?: string | undefined;
  }

  interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
      name?: string | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
      max?: number | string | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
      name?: string | undefined;
  }

  interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
      async?: boolean | undefined;
      /** @deprecated */
      charSet?: string | undefined;
      crossOrigin?: string | undefined;
      defer?: boolean | undefined;
      integrity?: string | undefined;
      noModule?: boolean | undefined;
      nonce?: string | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      src?: string | undefined;
      type?: string | undefined;
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
      autoComplete?: string | undefined;
      autoFocus?: boolean | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      multiple?: boolean | undefined;
      name?: string | undefined;
      required?: boolean | undefined;
      size?: number | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
      onChange?: ChangeEventHandler<T> | undefined;
  }

  interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
      height?: number | string | undefined;
      media?: string | undefined;
      sizes?: string | undefined;
      src?: string | undefined;
      srcSet?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;
  }

  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
      media?: string | undefined;
      nonce?: string | undefined;
      scoped?: boolean | undefined;
      type?: string | undefined;
  }

  interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
      cellPadding?: number | string | undefined;
      cellSpacing?: number | string | undefined;
      summary?: string | undefined;
      width?: number | string | undefined;
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
      autoComplete?: string | undefined;
      autoFocus?: boolean | undefined;
      cols?: number | undefined;
      dirName?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      maxLength?: number | undefined;
      minLength?: number | undefined;
      name?: string | undefined;
      placeholder?: string | undefined;
      readOnly?: boolean | undefined;
      required?: boolean | undefined;
      rows?: number | undefined;
      value?: string | ReadonlyArray<string> | number | undefined;
      wrap?: string | undefined;

      onChange?: ChangeEventHandler<T> | undefined;
  }

  interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
      align?: "left" | "center" | "right" | "justify" | "char" | undefined;
      colSpan?: number | undefined;
      headers?: string | undefined;
      rowSpan?: number | undefined;
      scope?: string | undefined;
      abbr?: string | undefined;
      height?: number | string | undefined;
      width?: number | string | undefined;
      valign?: "top" | "middle" | "bottom" | "baseline" | undefined;
  }

  interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
      align?: "left" | "center" | "right" | "justify" | "char" | undefined;
      colSpan?: number | undefined;
      headers?: string | undefined;
      rowSpan?: number | undefined;
      scope?: string | undefined;
      abbr?: string | undefined;
  }

  interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
      dateTime?: string | undefined;
  }

  interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
      default?: boolean | undefined;
      kind?: string | undefined;
      label?: string | undefined;
      src?: string | undefined;
      srcLang?: string | undefined;
  }

  interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
      height?: number | string | undefined;
      playsInline?: boolean | undefined;
      poster?: string | undefined;
      width?: number | string | undefined;
      disablePictureInPicture?: boolean | undefined;
      disableRemotePlayback?: boolean | undefined;
  }

  // this list is "complete" in that it contains every SVG attribute
  // that React supports, but the types can be improved.
  // Full list here: https://facebook.github.io/react/docs/dom-elements.html
  //
  // The three broad type categories are (in order of restrictiveness):
  //   - "number | string"
  //   - "string"
  //   - union of string literals
  interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // Attributes which also defined in HTMLAttributes
      // See comment in SVGDOMPropertyConfig.js
      className?: string | undefined;
      color?: string | undefined;
      height?: number | string | undefined;
      id?: string | undefined;
      lang?: string | undefined;
      max?: number | string | undefined;
      media?: string | undefined;
      method?: string | undefined;
      min?: number | string | undefined;
      name?: string | undefined;
      style?: CSSProperties | undefined;
      target?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;

      // Other HTML properties supported by SVG elements in browsers
      role?: AriaRole | undefined;
      tabIndex?: number | undefined;
      crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;

      // SVG Specific attributes
      accentHeight?: number | string | undefined;
      accumulate?: "none" | "sum" | undefined;
      additive?: "replace" | "sum" | undefined;
      alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
      "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | undefined;
      allowReorder?: "no" | "yes" | undefined;
      alphabetic?: number | string | undefined;
      amplitude?: number | string | undefined;
      arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined;
      ascent?: number | string | undefined;
      attributeName?: string | undefined;
      attributeType?: string | undefined;
      autoReverse?: Booleanish | undefined;
      azimuth?: number | string | undefined;
      baseFrequency?: number | string | undefined;
      baselineShift?: number | string | undefined;
      baseProfile?: number | string | undefined;
      bbox?: number | string | undefined;
      begin?: number | string | undefined;
      bias?: number | string | undefined;
      by?: number | string | undefined;
      calcMode?: number | string | undefined;
      capHeight?: number | string | undefined;
      clip?: number | string | undefined;
      clipPath?: string | undefined;
      clipPathUnits?: number | string | undefined;
      clipRule?: number | string | undefined;
      colorInterpolation?: number | string | undefined;
      colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
      colorProfile?: number | string | undefined;
      colorRendering?: number | string | undefined;
      contentScriptType?: number | string | undefined;
      contentStyleType?: number | string | undefined;
      cursor?: number | string | undefined;
      cx?: number | string | undefined;
      cy?: number | string | undefined;
      d?: string | undefined;
      decelerate?: number | string | undefined;
      descent?: number | string | undefined;
      diffuseConstant?: number | string | undefined;
      direction?: number | string | undefined;
      display?: number | string | undefined;
      divisor?: number | string | undefined;
      dominantBaseline?: number | string | undefined;
      dur?: number | string | undefined;
      dx?: number | string | undefined;
      dy?: number | string | undefined;
      edgeMode?: number | string | undefined;
      elevation?: number | string | undefined;
      enableBackground?: number | string | undefined;
      end?: number | string | undefined;
      exponent?: number | string | undefined;
      externalResourcesRequired?: Booleanish | undefined;
      fill?: string | undefined;
      fillOpacity?: number | string | undefined;
      fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
      filter?: string | undefined;
      filterRes?: number | string | undefined;
      filterUnits?: number | string | undefined;
      floodColor?: number | string | undefined;
      floodOpacity?: number | string | undefined;
      focusable?: Booleanish | "auto" | undefined;
      fontFamily?: string | undefined;
      fontSize?: number | string | undefined;
      fontSizeAdjust?: number | string | undefined;
      fontStretch?: number | string | undefined;
      fontStyle?: number | string | undefined;
      fontVariant?: number | string | undefined;
      fontWeight?: number | string | undefined;
      format?: number | string | undefined;
      fr?: number | string | undefined;
      from?: number | string | undefined;
      fx?: number | string | undefined;
      fy?: number | string | undefined;
      g1?: number | string | undefined;
      g2?: number | string | undefined;
      glyphName?: number | string | undefined;
      glyphOrientationHorizontal?: number | string | undefined;
      glyphOrientationVertical?: number | string | undefined;
      glyphRef?: number | string | undefined;
      gradientTransform?: string | undefined;
      gradientUnits?: string | undefined;
      hanging?: number | string | undefined;
      horizAdvX?: number | string | undefined;
      horizOriginX?: number | string | undefined;
      href?: string | undefined;
      ideographic?: number | string | undefined;
      imageRendering?: number | string | undefined;
      in2?: number | string | undefined;
      in?: string | undefined;
      intercept?: number | string | undefined;
      k1?: number | string | undefined;
      k2?: number | string | undefined;
      k3?: number | string | undefined;
      k4?: number | string | undefined;
      k?: number | string | undefined;
      kernelMatrix?: number | string | undefined;
      kernelUnitLength?: number | string | undefined;
      kerning?: number | string | undefined;
      keyPoints?: number | string | undefined;
      keySplines?: number | string | undefined;
      keyTimes?: number | string | undefined;
      lengthAdjust?: number | string | undefined;
      letterSpacing?: number | string | undefined;
      lightingColor?: number | string | undefined;
      limitingConeAngle?: number | string | undefined;
      local?: number | string | undefined;
      markerEnd?: string | undefined;
      markerHeight?: number | string | undefined;
      markerMid?: string | undefined;
      markerStart?: string | undefined;
      markerUnits?: number | string | undefined;
      markerWidth?: number | string | undefined;
      mask?: string | undefined;
      maskContentUnits?: number | string | undefined;
      maskUnits?: number | string | undefined;
      mathematical?: number | string | undefined;
      mode?: number | string | undefined;
      numOctaves?: number | string | undefined;
      offset?: number | string | undefined;
      opacity?: number | string | undefined;
      operator?: number | string | undefined;
      order?: number | string | undefined;
      orient?: number | string | undefined;
      orientation?: number | string | undefined;
      origin?: number | string | undefined;
      overflow?: number | string | undefined;
      overlinePosition?: number | string | undefined;
      overlineThickness?: number | string | undefined;
      paintOrder?: number | string | undefined;
      panose1?: number | string | undefined;
      path?: string | undefined;
      pathLength?: number | string | undefined;
      patternContentUnits?: string | undefined;
      patternTransform?: number | string | undefined;
      patternUnits?: string | undefined;
      pointerEvents?: number | string | undefined;
      points?: string | undefined;
      pointsAtX?: number | string | undefined;
      pointsAtY?: number | string | undefined;
      pointsAtZ?: number | string | undefined;
      preserveAlpha?: Booleanish | undefined;
      preserveAspectRatio?: string | undefined;
      primitiveUnits?: number | string | undefined;
      r?: number | string | undefined;
      radius?: number | string | undefined;
      refX?: number | string | undefined;
      refY?: number | string | undefined;
      renderingIntent?: number | string | undefined;
      repeatCount?: number | string | undefined;
      repeatDur?: number | string | undefined;
      requiredExtensions?: number | string | undefined;
      requiredFeatures?: number | string | undefined;
      restart?: number | string | undefined;
      result?: string | undefined;
      rotate?: number | string | undefined;
      rx?: number | string | undefined;
      ry?: number | string | undefined;
      scale?: number | string | undefined;
      seed?: number | string | undefined;
      shapeRendering?: number | string | undefined;
      slope?: number | string | undefined;
      spacing?: number | string | undefined;
      specularConstant?: number | string | undefined;
      specularExponent?: number | string | undefined;
      speed?: number | string | undefined;
      spreadMethod?: string | undefined;
      startOffset?: number | string | undefined;
      stdDeviation?: number | string | undefined;
      stemh?: number | string | undefined;
      stemv?: number | string | undefined;
      stitchTiles?: number | string | undefined;
      stopColor?: string | undefined;
      stopOpacity?: number | string | undefined;
      strikethroughPosition?: number | string | undefined;
      strikethroughThickness?: number | string | undefined;
      string?: number | string | undefined;
      stroke?: string | undefined;
      strokeDasharray?: string | number | undefined;
      strokeDashoffset?: string | number | undefined;
      strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
      strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
      strokeMiterlimit?: number | string | undefined;
      strokeOpacity?: number | string | undefined;
      strokeWidth?: number | string | undefined;
      surfaceScale?: number | string | undefined;
      systemLanguage?: number | string | undefined;
      tableValues?: number | string | undefined;
      targetX?: number | string | undefined;
      targetY?: number | string | undefined;
      textAnchor?: string | undefined;
      textDecoration?: number | string | undefined;
      textLength?: number | string | undefined;
      textRendering?: number | string | undefined;
      to?: number | string | undefined;
      transform?: string | undefined;
      u1?: number | string | undefined;
      u2?: number | string | undefined;
      underlinePosition?: number | string | undefined;
      underlineThickness?: number | string | undefined;
      unicode?: number | string | undefined;
      unicodeBidi?: number | string | undefined;
      unicodeRange?: number | string | undefined;
      unitsPerEm?: number | string | undefined;
      vAlphabetic?: number | string | undefined;
      values?: string | undefined;
      vectorEffect?: number | string | undefined;
      version?: string | undefined;
      vertAdvY?: number | string | undefined;
      vertOriginX?: number | string | undefined;
      vertOriginY?: number | string | undefined;
      vHanging?: number | string | undefined;
      vIdeographic?: number | string | undefined;
      viewBox?: string | undefined;
      viewTarget?: number | string | undefined;
      visibility?: number | string | undefined;
      vMathematical?: number | string | undefined;
      widths?: number | string | undefined;
      wordSpacing?: number | string | undefined;
      writingMode?: number | string | undefined;
      x1?: number | string | undefined;
      x2?: number | string | undefined;
      x?: number | string | undefined;
      xChannelSelector?: string | undefined;
      xHeight?: number | string | undefined;
      xlinkActuate?: string | undefined;
      xlinkArcrole?: string | undefined;
      xlinkHref?: string | undefined;
      xlinkRole?: string | undefined;
      xlinkShow?: string | undefined;
      xlinkTitle?: string | undefined;
      xlinkType?: string | undefined;
      xmlBase?: string | undefined;
      xmlLang?: string | undefined;
      xmlns?: string | undefined;
      xmlnsXlink?: string | undefined;
      xmlSpace?: string | undefined;
      y1?: number | string | undefined;
      y2?: number | string | undefined;
      y?: number | string | undefined;
      yChannelSelector?: string | undefined;
      z?: number | string | undefined;
      zoomAndPan?: string | undefined;
  }

  interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
      allowFullScreen?: boolean | undefined;
      allowpopups?: boolean | undefined;
      autoFocus?: boolean | undefined;
      autosize?: boolean | undefined;
      blinkfeatures?: string | undefined;
      disableblinkfeatures?: string | undefined;
      disableguestresize?: boolean | undefined;
      disablewebsecurity?: boolean | undefined;
      guestinstance?: string | undefined;
      httpreferrer?: string | undefined;
      nodeintegration?: boolean | undefined;
      partition?: string | undefined;
      plugins?: boolean | undefined;
      preload?: string | undefined;
      src?: string | undefined;
      useragent?: string | undefined;
      webpreferences?: string | undefined;
  }

  //
  // React.DOM
  // ----------------------------------------------------------------------

  interface ReactHTML {
      a: DetailedHTMLFactory<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      abbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      address: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      area: DetailedHTMLFactory<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
      article: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      aside: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      audio: DetailedHTMLFactory<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
      b: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      base: DetailedHTMLFactory<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
      bdi: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      bdo: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      big: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      blockquote: DetailedHTMLFactory<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
      body: DetailedHTMLFactory<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
      br: DetailedHTMLFactory<HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
      button: DetailedHTMLFactory<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      canvas: DetailedHTMLFactory<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
      caption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      cite: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      code: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      col: DetailedHTMLFactory<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
      colgroup: DetailedHTMLFactory<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
      data: DetailedHTMLFactory<DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>;
      datalist: DetailedHTMLFactory<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
      dd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      del: DetailedHTMLFactory<DelHTMLAttributes<HTMLModElement>, HTMLModElement>;
      details: DetailedHTMLFactory<DetailsHTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement>;
      dfn: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      dialog: DetailedHTMLFactory<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
      div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      dl: DetailedHTMLFactory<HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
      dt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      em: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      embed: DetailedHTMLFactory<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
      fieldset: DetailedHTMLFactory<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
      figcaption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      figure: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      footer: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      form: DetailedHTMLFactory<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      h1: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h4: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h5: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h6: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      head: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLHeadElement>;
      header: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      hgroup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      hr: DetailedHTMLFactory<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
      html: DetailedHTMLFactory<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
      i: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      iframe: DetailedHTMLFactory<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
      img: DetailedHTMLFactory<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      input: DetailedHTMLFactory<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      ins: DetailedHTMLFactory<InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
      kbd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      keygen: DetailedHTMLFactory<KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
      label: DetailedHTMLFactory<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
      legend: DetailedHTMLFactory<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
      li: DetailedHTMLFactory<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      link: DetailedHTMLFactory<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
      main: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      map: DetailedHTMLFactory<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
      mark: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      menu: DetailedHTMLFactory<MenuHTMLAttributes<HTMLElement>, HTMLElement>;
      menuitem: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      meta: DetailedHTMLFactory<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
      meter: DetailedHTMLFactory<MeterHTMLAttributes<HTMLMeterElement>, HTMLMeterElement>;
      nav: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      noscript: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      object: DetailedHTMLFactory<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
      ol: DetailedHTMLFactory<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
      optgroup: DetailedHTMLFactory<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
      option: DetailedHTMLFactory<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
      output: DetailedHTMLFactory<OutputHTMLAttributes<HTMLOutputElement>, HTMLOutputElement>;
      p: DetailedHTMLFactory<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      param: DetailedHTMLFactory<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
      picture: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      pre: DetailedHTMLFactory<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
      progress: DetailedHTMLFactory<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
      q: DetailedHTMLFactory<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
      rp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      rt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      ruby: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      s: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      samp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      slot: DetailedHTMLFactory<SlotHTMLAttributes<HTMLSlotElement>, HTMLSlotElement>;
      script: DetailedHTMLFactory<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
      section: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      select: DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
      small: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      source: DetailedHTMLFactory<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
      span: DetailedHTMLFactory<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      strong: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      style: DetailedHTMLFactory<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
      sub: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      summary: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      sup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      table: DetailedHTMLFactory<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
      template: DetailedHTMLFactory<HTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement>;
      tbody: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      td: DetailedHTMLFactory<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
      textarea: DetailedHTMLFactory<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
      tfoot: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      th: DetailedHTMLFactory<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
      thead: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      time: DetailedHTMLFactory<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement>;
      title: DetailedHTMLFactory<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
      tr: DetailedHTMLFactory<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
      track: DetailedHTMLFactory<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
      u: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      ul: DetailedHTMLFactory<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      "var": DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      video: DetailedHTMLFactory<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
      wbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
      webview: DetailedHTMLFactory<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>;
  }

  interface ReactSVG {
      animate: SVGFactory;
      circle: SVGFactory;
      clipPath: SVGFactory;
      defs: SVGFactory;
      desc: SVGFactory;
      ellipse: SVGFactory;
      feBlend: SVGFactory;
      feColorMatrix: SVGFactory;
      feComponentTransfer: SVGFactory;
      feComposite: SVGFactory;
      feConvolveMatrix: SVGFactory;
      feDiffuseLighting: SVGFactory;
      feDisplacementMap: SVGFactory;
      feDistantLight: SVGFactory;
      feDropShadow: SVGFactory;
      feFlood: SVGFactory;
      feFuncA: SVGFactory;
      feFuncB: SVGFactory;
      feFuncG: SVGFactory;
      feFuncR: SVGFactory;
      feGaussianBlur: SVGFactory;
      feImage: SVGFactory;
      feMerge: SVGFactory;
      feMergeNode: SVGFactory;
      feMorphology: SVGFactory;
      feOffset: SVGFactory;
      fePointLight: SVGFactory;
      feSpecularLighting: SVGFactory;
      feSpotLight: SVGFactory;
      feTile: SVGFactory;
      feTurbulence: SVGFactory;
      filter: SVGFactory;
      foreignObject: SVGFactory;
      g: SVGFactory;
      image: SVGFactory;
      line: SVGFactory;
      linearGradient: SVGFactory;
      marker: SVGFactory;
      mask: SVGFactory;
      metadata: SVGFactory;
      path: SVGFactory;
      pattern: SVGFactory;
      polygon: SVGFactory;
      polyline: SVGFactory;
      radialGradient: SVGFactory;
      rect: SVGFactory;
      stop: SVGFactory;
      svg: SVGFactory;
      switch: SVGFactory;
      symbol: SVGFactory;
      text: SVGFactory;
      textPath: SVGFactory;
      tspan: SVGFactory;
      use: SVGFactory;
      view: SVGFactory;
  }

  interface ReactDOM extends ReactHTML, ReactSVG { }

  //
  // React.PropTypes
  // ----------------------------------------------------------------------

  type Validator<T> = PropTypes.Validator<T>;

  type Requireable<T> = PropTypes.Requireable<T>;

  type ValidationMap<T> = PropTypes.ValidationMap<T>;

  type WeakValidationMap<T> = {
      [K in keyof T]?: null extends T[K]
          ? Validator<T[K] | null | undefined>
          : undefined extends T[K]
          ? Validator<T[K] | null | undefined>
          : Validator<T[K]>
  };

  interface ReactPropTypes {
      any: typeof PropTypes.any;
      array: typeof PropTypes.array;
      bool: typeof PropTypes.bool;
      func: typeof PropTypes.func;
      number: typeof PropTypes.number;
      object: typeof PropTypes.object;
      string: typeof PropTypes.string;
      node: typeof PropTypes.node;
      element: typeof PropTypes.element;
      instanceOf: typeof PropTypes.instanceOf;
      oneOf: typeof PropTypes.oneOf;
      oneOfType: typeof PropTypes.oneOfType;
      arrayOf: typeof PropTypes.arrayOf;
      objectOf: typeof PropTypes.objectOf;
      shape: typeof PropTypes.shape;
      exact: typeof PropTypes.exact;
  }

  //
  // React.Children
  // ----------------------------------------------------------------------

  interface ReactChildren {
      map<T, C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => T):
          C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
      forEach<C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => void): void;
      count(children: any): number;
      only<C>(children: C): C extends any[] ? never : C;
      toArray(children: ReactNode | ReactNode[]): Array<Exclude<ReactNode, boolean | null | undefined>>;
  }

  //
  // Browser Interfaces
  // https://github.com/nikeee/2048-typescript/blob/master/2048/js/touch.d.ts
  // ----------------------------------------------------------------------

  interface AbstractView {
      styleMedia: StyleMedia;
      document: Document;
  }

  interface Touch {
      identifier: number;
      target: EventTarget;
      screenX: number;
      screenY: number;
      clientX: number;
      clientY: number;
      pageX: number;
      pageY: number;
  }

  interface TouchList {
      [index: number]: Touch;
      length: number;
      item(index: number): Touch;
      identifiedTouch(identifier: number): Touch;
  }

  //
  // Error Interfaces
  // ----------------------------------------------------------------------
  interface ErrorInfo {
      /**
       * Captures which component contained the exception, and its ancestors.
       */
      componentStack: string;
  }
}
            
// import { CloudbaseAdapter, ResponseObject } from '@cloudbase/adapter-interface';
// import { ICloudbaseUpgradedConfig, ICloudbase, Persistence } from '@cloudbase/types';
// import { OrmClient, OrmRawQueryClient } from '@cloudbase/model';
// import { IMySqlClient } from '@cloudbase/mysql';
// import { authModels } from '@cloudbase/oauth';
// import { AI } from '@cloudbase/ai';
// import { LANGS } from '@cloudbase/types'
// import { ICustomReqOpts } from '@cloudbase/types/functions'

type CloudbaseAdapter = any
type ICloudbaseUpgradedConfig = any
type ICloudbase = any
type Persistence = any
type OrmClient = any
type OrmRawQueryClient = any
type authModels = any
type IMySqlClient = any
type AI = any
type ResponseObject = any

interface IRetryOptions {
  retries?: number;
  factor?: number;
  minTimeout?: number;
  maxTimeout?: number;
  randomize?: boolean;
  timeouts?: number[];
  timeoutOps?: {
    timeout: number;
    cb: function;
  }
}

interface ICustomReqOpts {
  timeout?: number;
  retryOptions?: IRetryOptions;
  from?: 'node-sdk';
}

enum LANGS {
  ZH = 'zh-CN',
  EN = 'en-US',
}

type KV<T> = {
  [key: string]: T;
};

type ExcludeOf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


declare type MethodType = 'request' | 'post' | 'get' | 'head' | 'patch' | 'delete' | 'put'

interface ICallApiOptions {
  /** 请求的path */
  path?: string;
  /**请求方法 */
  method?: MethodType;
  /**请求头 */
  headers?: KV<any>;
  /** 请求体，根据content-type可以是不同类型 */
  body?: KV<any> | string;
  /**可传token，如果没有传值，则默认用当前登录的token */
  token?: string;
}

interface ICloudbaseApis {
  [apiName: string]: {
    [method in MethodType]: (callApiOptions: ICallApiOptions, opts?: KV<any>) => Promise<ResponseObject['data']>
  }
}

/**
 * module
 */
declare namespace cloudbase {

  interface SimpleStorage {
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    setItem: (key: string, value: string) => Promise<void>;
    getItemSync: (key: string) => string | null;
    removeItemSync: (key: string) => void;
    setItemSync: (key: string, value: string) => void;
  }

  interface ICloudbaseConfig {
    env: string;
    region?: string;
    timeout?: number;
    persistence?: Persistence;
    oauthClient?: any
    debug?: boolean;
    _fromApp?: ICloudbase;
    clientId?: string
    oauthInstance?: any;
    wxCloud?: any;
    i18n?: {
      t: (text: string) => string;
      LANG_HEADER_KEY: string;
      lang: LANGS;
    }
    accessKey?: string;
    endPointMode?: EndPointKey;
  }

  interface ICloudbaseExtension {
    name: string;
    invoke(opts: any, app: ICloudbase): Promise<any>;
  }

  interface Listeners {
    [key: string]: Function[];
  }

  interface ICloudbaseEvent {
    name: string;
    target: any;
    data: any;
  }

  interface ICloudbaseEventEmitter {
    on(name: string, listener: Function): this;
    off(name: string, listener: Function): this;
    fire(event: string | ICloudbaseEvent, data?: any): this;
  }

  interface ICloudbaseComponent {
    name: string;
    entity: any;
    namespace?: string;
    injectEvents?: {
      bus: ICloudbaseEventEmitter,
      events: string[];
    };
    IIFE?: boolean
  }

  interface ICloudbaseHook {
    entity: any;
    target: string;
  }

  type EndPointKey = 'CLOUD_API' | 'GATEWAY';

  interface ISetEndPointWithKey {
    key: EndPointKey;
    url?: string;
    protocol?: 'http' | 'https';
  }

  /**
   * 初始化Cloudbase
   *
   * @example
   * ```javascript
   * const app = cloudbase.init({
   *   env: 'your-envid',
   *   timeout: 15000
   * });
   * ```
   *
   * @param config 初始化配置
   * @param config.env 环境ID
   * @param config.timeout 【可选】网络请求超时上限，单位`ms`，默认值`15000`
   *
   * @return {!cloudbase.app.App} 初始化成功的Cloudbase实例
   */
  function init(config: ICloudbaseConfig & { lang?: LANGS }): cloudbase.app.App;

  function updateConfig(config: ICloudbaseUpgradedConfig): void;

  function updateLang(lang: LANGS): void
  /**
   * 使用适配器
   *
   * @example
   * ```javascript
   * cloudbase.useAdapters(adapter); // 使用单个适配器
   * cloudbase.useAdapters([         // 使用多个适配器
   *   adapterA,
   *   adapterB
   * ]);
   * ```
   *
   * @param adapters 适配器对象，入参可以为单个适配器对象，也可以是多个适配器对象的数组
   * @param options 适配器参数，可以在genAdapter中获取到该参数
   */
  function useAdapters(adapters: CloudbaseAdapter | CloudbaseAdapter[], options?: any): void;
  /**
   * 注册扩展能力插件
   *
   * @example
   * ```javascript
   * cloudbase.registerExtension(ext);
   * ```
   *
   * @param ext 扩展能力插件对象
   */
  function registerExtension(ext: ICloudbaseExtension): void;
  /**
   * 【谨慎操作】注册SDK的版本
   *
   * @example
   * ```javascript
   * cloudbase.registerVersion('1.2.1');
   * ```
   *
   * @param version SDK版本
   */
  function registerVersion(version: string): void;
  /**
   * 【谨慎操作】注册SDK的名称
   *
   * @example
   * ```javascript
   * cloudbase.registerSdkName('cloudbase-js-sdk');
   * ```
   *
   * @param name SDK名称
   */
  function registerSdkName(name: string): void;
  /**
   * 【谨慎操作】修改SDK请求的云开发服务地址
   *
   * @example
   * ```javascript
   * cloudbase.registerEndPoint('url','https');
   * ```
   *
   * @param url 服务地址
   * @param protocol 【可选】强制使用某种协议，默认与主站协议一致
   */
  function registerEndPoint(url: string, protocol?: 'http' | 'https'): void;
  /**
   * 【谨慎操作】修改SDK请求的「云开发/网关」服务地址
   *
   * @example
   * ```javascript
   * cloudbase.registerEndPointWithKey({
   *   key: "GATEWAY",
   *   url: "",
   *   protocol: ""
   * });
   * ```
   *
   */
  function registerEndPointWithKey(props: ISetEndPointWithKey): void;
  /**
   * 【谨慎操作】注册功能模块
   *
   * @example
   * ```javascript
   * cloudbase.registerComponent({});
   * ```
   *
   * @param component 功能模块对象
   */
  function registerComponent(component: ICloudbaseComponent): void;
  /**
   * 【谨慎操作】注册hook
   *
   * @example
   * ```javascript
   * cloudbase.registerHook({});
   * ```
   *
   * @param hook hook对象
   */
  function registerHook(hook: ICloudbaseHook): void;

  export interface models extends OrmClient, OrmRawQueryClient { }
}
/**
 * instance
 */
declare namespace cloudbase.app {
  interface App {
    /**
     * 创建Auth对象
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * const auth = app.auth({
     *   persistence: 'local'
     * });
     * ```
     *
     * @param options Auth初始化配置
     * @param options.persistence 本地登录态保留期限
     *
     * @return {!cloudbase.auth.App} Auth实例
     */
    auth(options: {
      persistence: cloudbase.auth.Persistence
    }): cloudbase.auth.App;
    /**
     * 调用云函数
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.callFunction({
     *   name: 'function-name'
     *   data: {
     *     a: 1,
     *     b: 2
     *   }
     * }).then(res=>{
     *   console.log(res.result);
     * }});
     * ```
     *
     * @param options 被调用的云函数信息
     * @param options.name 云函数的名称
     * @param options.data 【可选】云函数的参数，默认为空
     * @param options.parse 【可选】设置为 `true` 时，当函数返回值为对象时，API 请求会返回解析对象，而不是 JSON 字符串，默认为`false`
     *
     * @return Promise-函数执行结果
     */
    callFunction(options: cloudbase.functions.ICallFunctionOptions, callback?: Function): Promise<cloudbase.functions.ICallFunctionResponse>;

    /**
     * 调用云托管
     *
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app
     * .callContainer({
     * name: 'helloworld',
     * method: 'POST',
     * path: '/abc',
     * header:{
     *   'Content-Type': 'application/json; charset=utf-8'
     * },
     * data: {
     *   key1: 'test value 1',
     *   key2: 'test value 2'
     * },
     * })
     * .then((res) => {
     * console.log(res)
     * });
     * ```
     *
     * @param options 被调用的云托管信息
     * @param options.name 云托管的名称
     * @param options.data 【可选】云托管的参数，默认为空
     *
     * @return Promise-云托管执行结果
     */
    callContainer(options: cloudbase.functions.ICallFunctionOptions, customReqOpts?: ICustomReqOpts): Promise<ResponseObject>;
    /**
     * 云存储-上传文件
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.uploadFile({
     *   cloudPath: 'cloudPath',
     *   filePath: 'filePath',
     *   method: 'put',
     *   headers: {
     *      'Content-MD5': 'xxxxxx'
     *   }
     *   onUploadProgress: function(event){}
     * });
     * ```
     *
     * @param params
     * @param params.cloudPath 文件上传到云端后的绝对路径，包含文件名
     * @param params.filePath 被上传的文件对象
     * @param params.method 上传方法，默认为 put
     * @param params.headers 自定义头部字段
     * @param params.onUploadProgress 【可选】上传进度回调函数
     *
     * @return Promise-上传结果
     */
    uploadFile(params: cloudbase.storage.ICloudbaseUploadFileParams, callback?: Function): Promise<cloudbase.storage.ICloudbaseUploadFileResult>;
    /**
     * 云存储-下载文件
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.downloadFile({
     *   fileID: 'cloudPath'
     * });
     * ```
     *
     * @param params
     * @param params.fileID 要下载的文件的 `id`，在控制台云存储中查看
     *
     * @return Promise-下载结果
     */
    downloadFile(params: cloudbase.storage.ICloudbaseDownloadFileParams, callback?: Function): Promise<cloudbase.storage.ICloudbaseDownloadFileResult>;

    /**
     * 云存储-批量复制文件
     *
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.copyFile({
     *   fileList: [
     *     {
     *       srcPath: '源文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等，不能包含除[0-9 , a-z , A-Z]、/、!、-、_、.、、*和中文以外的字符，使用 / 字符来实现类似传统文件系统的层级结构',
     *       dstPath: '目标文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等，不能包含除[0-9 , a-z , A-Z]、/、!、-、_、.、、*和中文以外的字符，使用 / 字符来实现类似传统文件系统的层级结构',
     *       overwrite: '当目标文件已经存在时，是否允许覆盖已有文件，默认 true',
     *       removeOriginal: '复制文件后是否删除源文件，默认 false'
     *     }
     *   ]
     * });
     * ```
     *
     * @param params
     * @param params.fileList 要复制的文件信息组成的数组
     *
     * @return Promise-复制结果
     */
    copyFile(params: cloudbase.storage.ICloudbaseCopyFileParams, callback?: Function): Promise<cloudbase.storage.ICloudbaseCopyFileResult>;
    /**
     * 云存储-获取文件的下载链接
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.getTempFileURL({
     *   fileList: [
     *     '文件A的fileID',
     *     {
     *       fileID: '文件B的fileID',
     *       maxAge: 600 // 文件B的链接有效期，单位`ms`
     *     }
     *   ]
     * });
     * ```
     *
     * @param params
     * @param params.fileList 要下载的文件数组，数组元素可以是`string`或`Object`，如果是`string`代表文件ID，如果是`Object`可配置以下信息
     * @param params.fileList[].fileID 要下载的文件ID
     * @param params.fileList[].maxAge 下载链接的有效期，单位`ms`
     *
     * @return Promise-文件下载链接
     */
    getTempFileURL(params: cloudbase.storage.ICloudbaseGetTempFileURLParams, callback?: Function): Promise<cloudbase.storage.ICloudbaseGetTempFileURLResult>;
    /**
     * 云存储-删除文件
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.deleteFile({
     *   fileList: [
     *     '文件A的fileID',
     *     '文件B的fileID'
     *   ]
     * });
     * ```
     *
     * @param params
     * @param params.fileList 要删除的文件ID数组
     *
     * @return Promise-删除结果
     */
    deleteFile(params: cloudbase.storage.ICloudbaseDeleteFileParams, callback?: Function): Promise<cloudbase.storage.ICloudbaseDeleteFileResult>;
    getFileInfo(params: cloudbase.storage.ICloudbaseGetTempFileURLParams, callback?: Function): Promise<cloudbase.storage.ICloudbaseGetTempFileURLResult>;
    /**
     * 云存储-获取上传元信息
     *
     *
     * @param params
     * @param callback
     */
    getUploadMetadata(params: cloudbase.storage.ICloudbaseGetUploadMetadataParams, callback?: Function): Promise<any>;
    /**
     * 获取数据库实例
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * const db = app.database();
     * ```
     *
     * @return 数据库实例
     */
    database(dbConfig?: object): cloudbase.database.App;
    /**
     * 调用扩展能力插件功能
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * // 调用前需要先注册
     * app.registerExtension(ext);
     *
     * app.invokeExtension('扩展能力插件名称'，{
     *   // ...扩展能力插件的入参
     * });
     * ```
     *
     * @param name 扩展能力插件的名称
     * @param opts 【可选】扩展能力插件的参数，根据插件具体需求而定
     *
     * @return Promise-扩展能力插件执行结果
     */
    invokeExtension(name: string, opts: any): Promise<any>

    eventBus: any;

    /**
     * 调用 数据模型 SDK
     *

     * @example
     * ```javascript
        models.<model_name>.create() // 创建单条数据
        models.<model_name>.createMany()  // 创建多条数据
        models.<model_name>.update() // 更新单条数据
        models.<model_name>.updateMany() // 更新多条数据
        models.<model_name>.delete() // 删除单条数据
        models.<model_name>.deleteMany() // 删除多条数据
        models.<model_name>.get() // 查询单条数据
        models.<model_name>.list() // 查询多条数据
        models.$runSQL() // 执行原生 SQL 语句
      * ```
      */
    models: OrmClient & OrmRawQueryClient

    /**
     * MySQL 数据库
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     *
     * app.mysql().from('todos').select().then((res) => {
     *   console.log(res.data);
     * });
     * ```
     */
    mysql: IMySqlClient;

    ai(): AI;

    /**
     * 调用 开放APIs SDK
     *
     * @example
     * ```javascript
          apis.<userAPIsID>. request ()
          apis. <userAPIsID>.post()
          apis.<userAPIsID>.get()
          apis. <userAPIsID>. head ()
          apis. <userAPIsID>.patch()
          apis. <userAPIsID>.delete ()
          apis.<userAPIsID>.put ()
     * ```
     */
    apis: ICloudbaseApis;
  }
}
/**
 * auth
 */
declare namespace cloudbase.auth {
  type Persistence = 'local' | 'session' | 'none';

  interface IAccessTokenInfo {
    accessToken: string;
    env: string;
  }

  interface ILoginState {
    /**
     * 当前登录用户的信息
     */
    user: IUser;
  }

  interface ICredential {
    accessToken?: string;
    accessTokenExpire?: string;
  }

  interface IAuthProvider {
    signInWithRedirect: () => any;
  }

  /**
   * 用户信息
   */
  interface IUserInfo {
    uid?: string;
    loginType?: string;
    openid?: string;
    wxOpenId?: string;
    wxPublicId?: string;
    unionId?: string;
    qqMiniOpenId?: string;
    customUserId?: string;
    name?: string;
    gender?: string;
    email?: string;
    username?: string;
    hasPassword?: boolean;
    location?: {
      country?: string;
      province?: string;
      city?: string;
    };
    country?: string;
    province?: string;
    city?: string;
  }

  interface IUser extends IUserInfo {
    /**
     * 更新用户信息
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user.update({
     *   nickName: '新昵称'
     * }).then(()=>{});
     * ```
     *
     * @param userinfo 用户信息
     *
     * @return Promise
     *
     */
    update(userinfo: IUserInfo): Promise<void>;
    /**
     * 刷新本地用户信息
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user.refresh().then(()=>{});
     * ```
     *
     * @return Promise-刷新后的用户信息
     *
     */
    refresh(): Promise<IUserInfo>;
    /**
     * 同步获取本地用户信息
     */
    checkLocalInfo: () => void;
    /**
     * 异步获取本地用户信息
     */
    checkLocalInfoAsync: () => Promise<void>;
    linkWithTicket?: (ticket: string) => Promise<void>;
    linkWithRedirect?: (provider: IAuthProvider) => void;
    getLinkedUidList?: () => Promise<{ hasPrimaryUid: boolean, users: IUserInfo[] }>;
    setPrimaryUid?: (uid: string) => Promise<void>;
    unlink?: (loginType: 'CUSTOM' | 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'WECHAT-UNION') => Promise<void>;
  }

  interface App {
    /**
     * 获取当前登录的用户信息-同步操作
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const userInfo = app.auth().currentUser;
     * ```
     *
     * @return 用户信息，如果未登录返回`null`
     */
    currentUser: IUser | null;
    /**
     * 获取当前登录的用户信息-异步操作
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().getCurrentUser().then(userInfo=>{
     *   // ...
     * });
     * ```
     *
     * @return Promise-用户信息，如果未登录返回`null`
     */
    getCurrentUser(): Promise<IUser | null>
    /**
     * 绑定手机号码
     *

     *
     * @param params
     */
    bindPhoneNumber(params: authModels.BindPhoneRequest): Promise<void>
    /**
     * 绑定邮箱
     *

     *
     * @param params
     */
    bindEmail(params: authModels.BindEmailRequest): Promise<void>
    /**
     * 解除三方绑定
     *

     *
     * @param params
     */
    unbindProvider(params: authModels.UnbindProviderRequest): Promise<void>

    /**
     * 验证码验证
     *

     *
     * @param params
     */
    verify(params: authModels.VerifyRequest): Promise<authModels.VerifyResponse>
    /**
     * 获取验证码
     *

     *
     * @param params
     */
    getVerification(params: authModels.GetVerificationRequest): Promise<authModels.GetVerificationResponse>
    /**
     * 匿名登录
     *
     *

     *
     */
    signInAnonymously(data?: { provider_token?: string }): Promise<ILoginState>
    /**
     * 设置获取自定义登录 ticket 的函数
     *

     *
     *
     * @param getTickFn
     */
    setCustomSignFunc(getTickFn: authModels.GetCustomSignTicketFn): void
    /**
     * 使用自定义登录 ticket 登录
     *

     */
    signInWithCustomTicket(): Promise<ILoginState>
    /**
     * 用户登录，目前支持手机号，邮箱，用户名密码登录
     *

     */
    signIn(params: authModels.SignInRequest): Promise<ILoginState>
    /**
     * 用户注册，目前支持手机号验证码注册，邮箱验证码注册
     *

     */
    signUp(params: authModels.SignUpRequest): Promise<ILoginState>
    /**
     * 设置密码（已登录状态下，更新用户密码）
     *

     *
     */
    setPassword(params: authModels.SetPasswordRequest): Promise<void>
    /**
     * 获取用户信息
     *

     */
    getUserInfo(): Promise<IUserInfo>
    /**
     * 获取本地登录态-同步操作
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const loginState = app.auth().hasLoginState();
     * ```
     *
     * @return 登录态信息，如果未登录返回`null`
     */
    hasLoginState(): ILoginState | null;
    /**
     * 获取本地登录态-异步操作
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().getLoginState().then(loginState=>{
     *   // ...
     * });
     * ```
     *
     * @return Promise-登录态信息，如果未登录返回`null`
     */
    getLoginState(): Promise<ILoginState | null>;
    /**
     * @deprecated
     */
    getAuthHeader(): {}
    /**
     * 为已有账户绑定第三方账户
     *

     */
    bindWithProvider(params: authModels.BindWithProviderRequest,): Promise<void>
    /**
     * 查询用户（自定义登录场景和匿名登录场景，不支持使用该接口查询用户信息）
     *

     *
     */
    queryUser(queryObj: authModels.QueryUserProfileRequest): Promise<authModels.QueryUserProfileResponse>
    /**
     * 获取当前登录用户的访问凭证
     *

     */
    getAccessToken(): Promise<{ accessToken: string, env: string }>
    /**
     * 提供第三方平台登录 token
     *

     */
    grantProviderToken(params: authModels.GrantProviderTokenRequest): Promise<authModels.GrantProviderTokenResponse>
    patchProviderToken(params: authModels.PatchProviderTokenRequest): Promise<authModels.PatchProviderTokenResponse>
    /**
     * 第三方平台登录
     *

     */
    signInWithProvider(params: authModels.SignInWithProviderRequest): Promise<ILoginState>
    grantToken(params: authModels.GrantTokenRequest): Promise<ILoginState>
    /**
     * 生成第三方平台授权 Uri （如微信二维码扫码授权网页）
     *

     */
    genProviderRedirectUri(params: authModels.GenProviderRedirectUriRequest): Promise<authModels.GenProviderRedirectUriResponse>
    /**
     * 重置密码（用户忘记密码无法登录时，可使用该接口强制设置密码）
     *

     */
    resetPassword(params: authModels.ResetPasswordRequest): Promise<void>
    deviceAuthorize(params: authModels.DeviceAuthorizeRequest): Promise<authModels.DeviceAuthorizeResponse>
    /**
     * 通过 sudo 接口获取高级操作权限，如修改用户密码，修改手机号，邮箱等操作
     *

     */
    sudo(params: authModels.SudoRequest): Promise<authModels.SudoResponse>
    /**
     * 删除用户
     *

     */
    deleteMe(params: authModels.WithSudoRequest): Promise<authModels.UserProfile>
    /**
     * 获取第三方绑定列表
     *

     */
    getProviders(): Promise<authModels.UserProfileProvider>
    /**
     * 用于查询用户是否为匿名登录状态
     *

     */
    loginScope(): Promise<string>
    loginGroups(): Promise<string[]>
    onLoginStateChanged(callback: Function)
    createLoginState(): Promise<ILoginState>
    /**
     * 退出登录，请注意，匿名登录不支持退出
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().signOut().then(()=>{});
     * ```
     *
     * @return Promise
     */
    signOut(): Promise<void | { redirect_uri?: string }>;
    /**
     * 检查用户名是否被绑定过
     *

     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const username = "your_awesome_username";
     * auth.isUsernameRegistered(username).then(registered=>{
     *   // ...
     * });
     * ```
     *
     * @param username 用户名
     *
     * @return Promise-用户是否被绑定
     */
    isUsernameRegistered(username: string): Promise<boolean>;
    getMiniProgramQrCode(params: authModels.GetMiniProgramQrCodeRequest): Promise<authModels.GetMiniProgramQrCodeResponse>
    getMiniProgramQrCodeStatus(params: authModels.GetMiniProgramQrCodeStatusRequest): Promise<authModels.GetMiniProgramQrCodeStatusResponse>
    toDefaultLoginPage(params: authModels.ToDefaultLoginPage): Promise<void>
  }
}
/**
 * functions
 */
declare namespace cloudbase.functions {
  interface ICallFunctionOptions {
    name: string;
    data?: KV<any>;
    query?: KV<any>;
    search?: string;
    parse?: boolean;
  }

  interface ICallFunctionResponse {
    requestId: string;
    result: any;
  }
}
/**
 * storage
 */
declare namespace cloudbase.storage {
  interface ICloudbaseUploadFileParams {
    cloudPath: string;
    filePath?: string;
    method?: 'post' | 'put';
    headers?: KV<string>;
    onUploadProgress?: Function;
    // 文件内容 Buffer 或 文件可读流, node端使用
    fileContent?: any;
    customReqOpts?: ICustomReqOpts;
  }
  interface ICloudbaseUploadFileResult {
    fileID: string;
    requestId: string;
  }
  interface ICloudbaseGetUploadMetadataParams {
    cloudPath: string;
    customReqOpts?: ICustomReqOpts;
  }
  interface ICloudbaseDeleteFileParams {
    fileList: string[];
    customReqOpts?: ICustomReqOpts;
  }
  interface ICloudbaseDeleteFileResult {
    code?: string;
    message?: string;
    fileList?: {
      code?: string;
      fileID: string;
    }[];
    requestId?: string;
  }

  interface ICloudbaseFileInfo {
    fileID: string;
    maxAge: number;
  }

  interface ICloudbaseGetTempFileURLParams {
    fileList: string[] | ICloudbaseFileInfo[];
    customReqOpts?: ICustomReqOpts;
  }

  interface ICloudbaseGetTempFileURLResult {
    code?: string;
    message?: string;
    fileList?: {
      code?: string;
      message?: string;
      fileID: string;
      tempFileURL: string;
      download_url?: string;
    }[];
    requestId?: string;
  }
  interface ICloudbaseDownloadFileParams {
    fileID: string;
    tempFilePath?: string;
    customReqOpts?: ICustomReqOpts;
  }
  interface ICloudbaseDownloadFileResult {
    code?: string;
    message?: string;
    fileContent?: any;
    requestId?: string;
  }
  interface ICloudbaseFileMetaData {
    url: string;
    token: string;
    authorization: string;
    fileId: string;
    cosFileId: string;
    download_url: string
  }

  interface ICloudbaseFileMetaDataRes {
    data: ICloudbaseFileMetaData;
    requestId: string;
  }

  interface ICloudbaseCopyFileParams {
    fileList: Array<{
      srcPath: string;
      dstPath: string;
      overwrite?: boolean;
      removeOriginal?: boolean;
    }>
    customReqOpts?: ICustomReqOpts;
  }

  interface ICloudbaseCopyFileResult {
    fileList: Array<{
      fileId?: string;
      code?: string;
      message?: string;
    }>
    requestId?: string;
  }
}

declare namespace cloudbase.database {
  /**
   * realtime types
   */
  interface IWatchOptions {
    // server realtime data init & change event
    onChange: (snapshot: ISnapshot) => void
    // error while connecting / listening
    onError: (error: any) => void
  }
  interface DBRealtimeListener {
    /**
     * 关闭实时推送
     *

     *
     * @example
     * // 启动监听
     * const ref = db
     *   .collection("collName")
     *   .where({ test: _.gt(0) })
     *   .watch({
     *     onChange: (snapshot) => {
     *       console.log("收到snapshot**********", snapshot);
     *     },
     *     onError: (error) => {
     *       console.log("收到error**********", error);
     *     }
     *   });
     * // 关闭监听
     * ref.close();
     */
    close: () => void
  }
  type DataType = 'init' | 'update' | 'add' | 'remove' | 'replace' | 'limit';
  type QueueType = 'init' | 'enqueue' | 'dequeue' | 'update';
  interface ISnapshot {
    id: number
    docChanges: ISingleDBEvent[]
    docs: Record<string, any>
    type?: SnapshotType
  }

  interface ISingleDBEvent {
    id: number
    dataType: DataType
    queueType: QueueType
    docId: string
    doc: Record<string, any>
    updatedFields?: any
    removedFields?: any
  }

  type SnapshotType = 'init';

  interface IWatchable {
    /**
     * 开启实时推送
     *

     *
     * @example
     * const ref = db
     *   .collection("collName")
     *   .where({ test: _.gt(0) })
     *   .watch({
     *     onChange: (snapshot) => {
     *       console.log("收到snapshot**********", snapshot);
     *     },
     *     onError: (error) => {
     *       console.log("收到error**********", error);
     *     }
     *   });
     * @param options
     * @param options.onChange 监听数据变化的回调函数
     * @param options.onError 监听出现错误的回调函数
     *
     * @return 实时推送进程实例
     */
    watch(options: IWatchOptions): DBRealtimeListener;
  }
  /**
   * collection types
   */
  interface ICollection extends IQuery {
    /**
     * 插入一条文档
     *

     *
     * @param data 文档数据
     */
    add(data: Object): Promise<Pick<SetRes, 'code' | 'message'>>;
    /**
     * 获取一条文档的引用
     *

     *
     * @param id 文档ID
     */
    doc(id: string): IDocument;
  }
  /**
   * command types
   */
  interface IGeoNearOptions {
    geometry: IGeo['Point'] // 点的地理位置
    maxDistance?: number // 选填，最大距离，米为单位
    minDistance?: number // 选填，最小距离，米为单位
  }
  interface IGeoWithinOptions {
    geometry: IPolygon | IMultiPolygon
  }
  interface IGeoIntersectsOptions {
    geometry: IPoint | ILineString | IMultiPoint | IMultiLineString | IPolygon | IMultiPolygon;
  }
  interface ICommand {
    /**
     * 表示字段等于某个值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.eq(10)
     * })
     *
     * @param val 接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`
     *
     */
    eq(val: number | string | boolean | Object | any[]): any;
    /**
     * 表示字段不等于某个值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.neq(10)
     * })
     *
     * @param val 接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`
     *
     */
    neq(val: number | string | boolean | Object | any[]): any;
    /**
     * 字段大于指定值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.gt(10)
     * })
     *
     * @param val 数字
     *
     */
    gt(val: number): any;
    /**
     * 字段大于或等于指定值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.gte(10)
     * })
     *
     * @param val 数字
     *
     */
    gte(val: number): any;
    /**
     * 字段小于指定值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.lt(10)
     * })
     *
     * @param val 数字
     *
     */
    lt(val: number): any;
    /**
     * 字段小于或等于指定值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.lte(10)
     * })
     *
     * @param val 数字
     *
     */
    lte(val: number): any;
    /**
     * 字段值在给定的数组中
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.in([1,2,3])
     * })
     *
     * @param list 数组
     *
     */
    in(list: any[]): any;
    /**
     * 字段值不在给定的数组中
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.nin([1,2,3])
     * })
     *
     * @param list 数组
     *
     */
    nin(list: any[]): any;
    /**
     * 表示需同时满足指定的两个或以上的条件
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.and(_.gt(4), _.lt(32))
     * })
     *
     * @param args 多个条件
     *
     */
    and(...args: any[]): any;
    /**
     * 表示需满足所有指定条件中的至少一个
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.or(_.gt(4), _.lt(32))
     * })
     *
     * @param args 多个条件
     *
     */
    or(...args: any[]): any;
    /**
     * 用于设定字段等于指定值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      data: {
     *        style: _.set({
     *          color: "red"
     *        })
     *      }
     *   });
     *
     * @param val 被设定的属性对象
     *
     */
    set(val: any): any;
    /**
     * 用于指示字段自增某个值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      count: {
     *       favorites: _.inc(1)
     *     }
     *   });
     *
     * @param val 自增的值
     *
     */
    inc(val: number): any;
    /**
     * 用于指示字段自乘某个值
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      count: {
     *       favorites: _.mul(21)
     *     }
     *   });
     *
     * @param val 自乘的值
     *
     */
    mul(val: number): any;
    /**
     * 用于表示删除某个字段
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      rating: _.remove()
     *   });
     *
     */
    remove(): any;
    /**
     * 向数组尾部追加元素
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.push(["aaa", "bbb"])
     *   });
     *
     * @param val 支持传入单个元素或数组
     */
    push(val: any): any;
    /**
     * 删除数组尾部元素
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.pop()
     *   });
     *
     */
    pop(): any;
    /**
     * 向数组头部添加元素
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.unshift(["aaa", "bbb"])
     *   });
     *
     * @param val 支持传入单个元素或数组
     */
    unshift(val: any): any;
    /**
     * 删除数组头部元素
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.unshift()
     *   });
     *
     */
    shift(): any;
    /**
     * 按从近到远的顺序，找出字段值在给定点的附近的文档
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   location: _.geoNear({
     *     geometry: new db.Geo.Point(lngA, latA),
     *     maxDistance: 1000,
     *     minDistance: 0
     *   })
     * });
     *
     * @param options
     * @param options.geometry 点的地理位置
     * @param options.maxDistance 【可选】最大距离，米为单位
     * @param options.minDistance 【可选】最小距离，米为单位
     */
    geoNear(options: IGeoNearOptions): any;
    /**
     * 找出字段值在指定 Polygon / MultiPolygon 内的文档，无排序
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   location: _.geoWithin({
     *     geometry: new Polygon({
     *       new LineString([...Points])
     *     }),
     *   })
     * });
     *
     * @param options
     * @param options.geometry 地理位置
     */
    geoWithin(options: IGeoWithinOptions): any;
    /**
     * 找出字段值和给定的地理位置图形相交的文档
     *

     *
     * @example
     * const _ = db.command;
     * db.collection("user").where({
     *   location: _.geoNear({
     *     geometry: new LineString([new Point(lngA, latA), new Point(lngB, latB)]);
     *   })
     * });
     *
     * @param options
     * @param options.geometry 地理位置
     */
    geoIntersects(options: IGeoIntersectsOptions): any;
  }
  /**
   * document types
   */
  interface IDocument extends IWatchable {
    /**
     * 更新文档，如果要更新的文档不存在时新增一个文档
     *

     *
     * @example
     * collection
     *   .doc('docId')
     *   .set({name:'cloudbase'})
     *   .then(res=>{})
     *
     * @param data 文档数据
     *
     * @return Promise
     */
    set(data: Object): Promise<SetRes>;
    /**
     * 获取查询结果
     *

     *
     * @example
     * collection
     *   .doc('docId')
     *   .get()
     *   .then(res=>{})
     *
     * @return Promise-查询结果
     */
    get(): Promise<GetRes>;
    /**
     * 更新文档，如果要更新的文档不存在什么也不会做
     *

     *
     * @example
     * collection
     *   .doc('docId')
     *   .update({name:'cloudbase'})
     *   .then(res=>{})
     *
     * @param data 文档数据
     *
     * @return Promise
     */
    update(data: Object): Promise<SetRes>;
    /**
     * 删除一条文档
     *

     *
     * @example
     * collection
     *   .doc('docId')
     *   .remove()
     *   .then(res=>{})
     *
     * @return Promise
     */
    remove(): Promise<any>;
  }
  /**
   * query types
   */
  interface SetRes {
    code?: string;
    message?: string;
    updated?: number;
    upsertedId?: number;
    requestId: string;
  }
  interface GetRes {
    data: any[];
    requestId: string;
    code?: string;
    message?: string;
  }

  interface UpdateRes {
    requestId: string
    updated?: number
    upsertId?: string
    code?: string;
    message?: string;
  }

  interface QueryOrder {
    field?: string
    direction?: 'asc' | 'desc'
  }

  interface QueryOption {
    // 查询数量
    limit?: number
    // 偏移量
    offset?: number
    // 指定显示或者不显示哪些字段
    projection?: Object
  }
  interface IQuery extends IWatchable {
    /**
     * 获取数据库查询结果
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .get()
     *   .then(res=>{})
     *
     * @return Promise-查询结果
     */
    get(): Promise<GetRes>;
    /**
     * 更新数据库文档
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .update({
     *      name: 'newCloudbase'
     *    })
     *   .then(res=>{})
     *
     * @return Promise-查询结果
     */
    update(data: Object): Promise<UpdateRes>
    /**
     * 获取数据库查询结果的数目
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .count()
     *   .then(res=>{})
     *
     * @return Promise-查询结果
     */
    count(): Promise<any>;
    /**
     * 设置过滤条件
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *
     * @param query 可接收对象作为参数，表示筛选出拥有和传入对象相同的 key-value 的文档
     *
     */
    where(query: Object): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定查询结果集数量上限
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .limit(1)
     *
     * @param limit 查询结果数量上限
     */
    limit(limit: number): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定查询返回结果时从指定序列后的结果开始返回，常用于分页
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .skip(4)
     *
     * @param offset 跳过的条目数量
     */
    skip(offset: number): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定查询排序条件
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .orderBy("name", "asc")
     *
     * @param field 排序的字段
     * @param orderType 排序的顺序，升序(asc) 或 降序(desc)
     */
    orderBy(field: string, orderType: 'desc' | 'asc'): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定返回结果中文档需返回的字段
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .field({ age: true })
     *
     * @param projection 要过滤的字段集合，不返回传 false，返回传 true
     */
    field(projection: Object): ExcludeOf<IQuery, 'where'>;
    /**
     * 删除查询到的结果
     *

     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .remove()
     *
     * @return Promise
     */
    remove(): Promise<any>;
  }
  /**
   * geo types
   */
  interface IPoint { }
  interface ILineString { }
  interface IPolygon { }
  interface IMultiPoint { }
  interface IMultiLineString { }
  interface IMultiPolygon { }
  interface IGeo {
    /**
     * 用于表示地理位置点
     *

     *
     * @example
     * const point = new db.Geo.Point(lng,lat);
     *
     * @param longitude 经度
     * @param latitude 纬度
     *
     * @return Point
     */
    Point: {
      new(longitude: number, latitude: number): IPoint;
    };
    /**
     * 用于表示地理路径，是由两个或者更多的 Point 组成的线段
     *

     *
     * @example
     * const point = new db.Geo.LineString([pointA,pointB]);
     *
     * @param points Point数组
     *
     * @return LineString
     */
    LineString: {
      new(points: IPoint[]): ILineString;
    }
    /**
     * 用于表示地理上的一个多边形
     *

     *
     * @example
     * const point = new db.Geo.Polygon([lineStringA,lineStringB]);
     *
     * @param lines LineString数组
     *
     * @return Polygon
     */
    Polygon: {
      new(lines: ILineString[]): IPolygon;
    }
    /**
     * 用于表示多个点 Point 的集合
     *

     *
     * @example
     * const point = new db.Geo.MultiPoint([pointA,pointB]);
     *
     * @param points Point数组
     *
     * @return MultiPoint
     */
    MultiPoint: {
      new(points: IPoint[]): IMultiPoint;
    }
    /**
     * 用于表示多个地理路径 LineString 的集合
     *

     *
     * @example
     * const point = new db.Geo.MultiLineString([lineA,lineB]);
     *
     * @param lines LineString数组
     *
     * @return MultiLineString
     */
    MultiLineString: {
      new(lines: ILineString[]): IMultiLineString;
    }
    /**
     * 用于表示多个地理多边形 Polygon 的集合
     *

     *
     * @example
     * const point = new db.Geo.MultiPolygon([polygonA,polygonB]);
     *
     * @param polygons Polygon数组
     *
     * @return MultiPolygon
     */
    MultiPolygon: {
      new(polygons: IPolygon[]): IMultiPolygon;
    }
  }
  /**
   * regexp types
   */
  interface IRegExpOptions {
    regexp: string;
    options?: string;
  }
  interface IRegExp {
    (options: IRegExpOptions): any;
  }
  /**
   * instance types
   */
  interface App {
    /**
     * 数据库指令
     *

     */
    command: ICommand;
    /**
     * 数据库Geo地理位置
     *

     */
    Geo: IGeo;
    /**
     * 根据正则表达式进行筛选
     *

     *
     * @example
     * db.collection('articles').where({
     *   version: new db.RegExp({
     *     regexp: '^\ds'   // 正则表达式为 /^ds/，转义后变成 '^\ds'
     *     options: 'i'    // i表示忽略大小写
     *   })
     * })
     *
     * @param options
     * @param options.regexp 正则表达式Pattern
     * @param options.options 正则表达式Flags
     */
    RegExp: IRegExp;
    /**
     * 创建集合的引用
     *

     *
     * @example
     * const coll = db.collection('demo');
     *
     * @param name 集合名称
     *
     * @return 集合的引用
     */
    collection(name: string): ICollection;
  }
}


// export default cloudbase;
// export as namespace cloudbase;

          
// DTS String Inner End
