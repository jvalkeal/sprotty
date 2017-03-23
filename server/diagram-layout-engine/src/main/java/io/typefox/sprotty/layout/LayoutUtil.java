package io.typefox.sprotty.layout;

import java.util.Map;

import com.google.common.collect.Maps;

import io.typefox.sprotty.api.Dimension;
import io.typefox.sprotty.api.ElementResize;
import io.typefox.sprotty.api.ResizeAction;
import io.typefox.sprotty.api.SGraph;
import io.typefox.sprotty.api.SModelElement;
import io.typefox.sprotty.api.SModelRoot;
import io.typefox.sprotty.api.SNode;

public final class LayoutUtil {
	
	private LayoutUtil() {}
	
	public static Map<String, SNode> createId2NodeMap(SModelRoot graph) {
		Map<String, SNode> result = Maps.newHashMap();
		addNodes(graph, result);
		return result;
	}
	
	private static void addNodes(SModelElement element, Map<String, SNode> map) {
		if (element.getChildren() != null) {
			for (SModelElement child : element.getChildren()) {
				if (child instanceof SNode) {
					if (child.getId() != null)
						map.put(child.getId(), (SNode) child);
					addNodes(child, map);
				}
			}
		}
	}
	
	public static void applyResizeAction(SGraph graph, ResizeAction action) {
		Map<String, SNode> nodeMap = createId2NodeMap(graph);
		for (ElementResize resize : action.getResizes()) {
			SNode node = nodeMap.get(resize.getElementId());
			if (node != null) {
				Dimension newSize = resize.getNewSize();
				if (newSize.getWidth() != null)
					node.setWidth(newSize.getWidth());
				if (newSize.getHeight() != null)
					node.setHeight(newSize.getHeight());
			}
		}
	}

}