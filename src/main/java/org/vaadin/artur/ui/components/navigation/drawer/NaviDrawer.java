package org.vaadin.artur.ui.components.navigation.drawer;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

@Tag("navi-drawer")
@JsModule("./navi-drawer.ts")
public class NaviDrawer extends Component implements HasComponents {

    public void toggle() {
        getElement().callJsFunction("toggle");
    }

}