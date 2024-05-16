import React from "react";
import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { SideBlock } from "./SideBlock";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

export const TagsBlock = ({ items, isLoading = true }) => {
  const { tags } = useSelector((state) => state.posts);
  const isTagsLoading = tags.status === 'loading';

  if (isTagsLoading) {
    return <List isLoading={true} />
  }

  return (
    <SideBlock title="Tags">
      <List>
        {items.map((tag, i) => (
          <Link
            key={uniqueId()}
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${tag}`}>
            <ListItem key={uniqueId(i)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={tag} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
          
        ))}
      </List>
    </SideBlock>
  );
};
