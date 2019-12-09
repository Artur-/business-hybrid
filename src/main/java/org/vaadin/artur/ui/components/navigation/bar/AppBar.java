package org.vaadin.artur.ui.components.navigation.bar;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

@Tag("app-bar")
@JsModule("./app-bar.ts")
public class AppBar extends Component {
	public AppBar() {
	}

	// menuIcon.addClickListener(e -> MainLayout.get().getNaviDrawer().toggle());

	// ContextMenu contextMenu = new ContextMenu(avatar);
	// contextMenu.setOpenOnClick(true);
	// contextMenu.addItem("Settings",
	// e -> Notification.show("Not implemented yet.", 3000,
	// Notification.Position.BOTTOM_CENTER));
	// contextMenu.addItem("Log Out",
	// e -> Notification.show("Not implemented yet.", 3000,
	// Notification.Position.BOTTOM_CENTER));

}
