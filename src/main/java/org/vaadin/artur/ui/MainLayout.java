package org.vaadin.artur.ui;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasElement;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.server.*;
import com.vaadin.flow.theme.lumo.Lumo;
import org.vaadin.artur.ui.components.FlexBoxLayout;
import org.vaadin.artur.ui.components.navigation.bar.AppBar;
import org.vaadin.artur.ui.components.navigation.bar.TabBar;
import org.vaadin.artur.ui.components.navigation.drawer.NaviDrawer;
import org.vaadin.artur.ui.components.navigation.drawer.NaviItem;
import org.vaadin.artur.ui.components.navigation.drawer.NaviMenu;
import org.vaadin.artur.ui.util.UIUtils;
import org.vaadin.artur.ui.util.css.FlexDirection;
import org.vaadin.artur.ui.util.css.Overflow;
import org.vaadin.artur.ui.views.Accounts;
import org.vaadin.artur.ui.views.Home;
import org.vaadin.artur.ui.views.Payments;
import org.vaadin.artur.ui.views.Statistics;
import org.vaadin.artur.ui.views.personnel.Accountants;
import org.vaadin.artur.ui.views.personnel.Managers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CssImport("./styles/lumo/border-radius.css")
@CssImport("./styles/lumo/icon-size.css")
@CssImport("./styles/lumo/margin.css")
@CssImport("./styles/lumo/padding.css")
@CssImport("./styles/lumo/shadow.css")
@CssImport("./styles/lumo/spacing.css")
@CssImport("./styles/lumo/typography.css")
@CssImport("./styles/misc/box-shadow-borders.css")
@JsModule("@vaadin/vaadin-lumo-styles/badge")
@PWA(name = "Client-Side-Views", shortName = "Client-Side-Views", iconPath = "images/logo-18.png", backgroundColor = "#233348", themeColor = "#233348")
@Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")
public class MainLayout extends FlexBoxLayout
		implements RouterLayout, AfterNavigationObserver {

	private static final Logger log = LoggerFactory.getLogger(MainLayout.class);
	private static final String CLASS_NAME = "root";

	private FlexBoxLayout row;
	private NaviDrawer naviDrawer;
	private FlexBoxLayout column;

	private Div appHeaderInner;
	private FlexBoxLayout viewContainer;
	private AppBar appBar;
	private NaviMenu menu = new NaviMenu();

	public MainLayout() {
		VaadinSession.getCurrent()
				.setErrorHandler((ErrorHandler) errorEvent -> {
					log.error("Uncaught UI exception",
							errorEvent.getThrowable());
					Notification.show(
							"We are sorry, but an internal error occurred");
				});

		addClassName(CLASS_NAME);
		setFlexDirection(FlexDirection.COLUMN);
		setSizeFull();

		// Initialise the UI building blocks
		initStructure();

		// Populate the navigation drawer
		initNaviItems();

		// Configure the headers and footers (optional)
		initHeadersAndFooters();
	}

	/**
	 * Initialise the required components and containers.
	 */
	private void initStructure() {
		naviDrawer = new NaviDrawer();

		viewContainer = new FlexBoxLayout();
		viewContainer.addClassName(CLASS_NAME + "__view-container");
		viewContainer.setOverflow(Overflow.HIDDEN);

		column = new FlexBoxLayout(viewContainer);
		column.addClassName(CLASS_NAME + "__column");
		column.setFlexDirection(FlexDirection.COLUMN);
		column.setFlexGrow(1, viewContainer);
		column.setOverflow(Overflow.HIDDEN);

		row = new FlexBoxLayout(naviDrawer, column);
		row.addClassName(CLASS_NAME + "__row");
		row.setFlexGrow(1, column);
		row.setOverflow(Overflow.HIDDEN);
		add(row);
		setFlexGrow(1, row);
	}

	/**
	 * Initialise the navigation items.
	 */
	private void initNaviItems() {
		menu.addNaviItem(VaadinIcon.HOME, "Home", Home.class);
		menu.addNaviItem(VaadinIcon.INSTITUTION, "Accounts", Accounts.class);
		menu.addNaviItem(VaadinIcon.CREDIT_CARD, "Payments", Payments.class);
		menu.addNaviItem(VaadinIcon.CHART, "Statistics", Statistics.class);

		NaviItem personnel = menu.addNaviItem(VaadinIcon.USERS, "Personnel",
				null);
		menu.addNaviItem(personnel, "Accountants", Accountants.class);
		menu.addNaviItem(personnel, "Managers", Managers.class);

		getNaviDrawer().add(menu);
	}

	/**
	 * Configure the app's inner and outer headers and footers.
	 */
	private void initHeadersAndFooters() {
		appBar = new AppBar("");

		// Tabbed navigation
			UIUtils.setTheme(Lumo.DARK, appBar);
			setAppHeaderInner(appBar);
	}


	private void setAppHeaderInner(Component... components) {
		if (appHeaderInner == null) {
			appHeaderInner = new Div();
			appHeaderInner.addClassName("app-header-inner");
			column.getElement().insertChild(0, appHeaderInner.getElement());
		}
		appHeaderInner.removeAll();
		appHeaderInner.add(components);
	}


	@Override
	public void showRouterLayoutContent(HasElement content) {
		this.viewContainer.getElement().appendChild(content.getElement());
	}

	public NaviDrawer getNaviDrawer() {
        return naviDrawer;
	}

	public static MainLayout get() {
		return (MainLayout) UI.getCurrent().getChildren()
				.filter(component -> component.getClass() == MainLayout.class)
				.findFirst().get();
	}

	public AppBar getAppBar() {
		return appBar;
	}

	@Override
	public void afterNavigation(AfterNavigationEvent event) {
		afterNavigationWithoutTabs(event);
	}

	private NaviItem getActiveItem(AfterNavigationEvent e) {
		for (NaviItem item : menu.getNaviItems()) {
			if (item.isHighlighted(e)) {
				return item;
			}
		}
		return null;
	}

	private void afterNavigationWithoutTabs(AfterNavigationEvent e) {
		NaviItem active = getActiveItem(e);
		if (active != null) {
			getAppBar().setTitle(active.getText());
		}
	}

}
