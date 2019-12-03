package org.vaadin.artur.ui.components;

import com.vaadin.flow.component.orderedlayout.FlexComponent;
import org.vaadin.artur.ui.util.FontSize;
import org.vaadin.artur.ui.util.FontWeight;
import org.vaadin.artur.ui.util.LumoStyles;
import org.vaadin.artur.ui.util.UIUtils;
import org.vaadin.artur.ui.util.css.BorderRadius;

public class Initials extends FlexBoxLayout {

	private String CLASS_NAME = "initials";

	public Initials(String initials) {
		setAlignItems(FlexComponent.Alignment.CENTER);
		setBackgroundColor(LumoStyles.Color.Contrast._10);
		setBorderRadius(BorderRadius.L);
		setClassName(CLASS_NAME);
		UIUtils.setFontSize(FontSize.S, this);
		UIUtils.setFontWeight(FontWeight._600, this);
		setHeight(LumoStyles.Size.M);
		setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
		setWidth(LumoStyles.Size.M);

		add(initials);
	}

}
