import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Button,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

/**
 * Represents a user.
 */
export interface User {
  user_id: number;
  display_name: string;
  profile_image: string;
  reputation: number;
  isBlocked: boolean;
  isFollowing: boolean;
}

/**
 * The props for the UserAccordion component.
 */
interface UserAccordionProps {
  user: User;
  onFollow: (userId: number) => void;
  onBlock: (userId: number) => void;
}

const useStyles = makeStyles({
  accordion: {
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
  },
  accordionSummary: {
    display: "flex",
    alignItems: "center",
    cursor: (props: { isBlocked: boolean }) =>
      props.isBlocked ? "default" : "pointer",
    opacity: (props: { isBlocked: boolean }) => (props.isBlocked ? 0.5 : 1),
  },
  summaryContent: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonGroup: {
    "& > * + *": {
      marginLeft: "8px",
    },
  },
  headings: {
    marginBottom: "8px",
    fontWeight: "bold",
  },
  followingIcon: {
    color: "#00C853",
    marginLeft: "8px",
  },
});

/**
 * The UserAccordion component.
 */
const UserAccordion: React.FC<UserAccordionProps> = ({
  user,
  onFollow,
  onBlock,
}) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles({ isBlocked: user.isBlocked });

  /**
   * Handles the change event of the accordion.
   */
  const handleAccordionChange = () => {
    if (!user.isBlocked) {
      setExpanded(!expanded);
    }
  };

  /**
   * Handles the follow action for the user.
   * 
   * @param userId The ID of the user.
   */
  const handleFollowClick = (userId: number) => {
    onFollow(userId);
  };

  /**
   * Handles the block action for the user.
   * 
   * @param userId The ID of the user.
   */
  const handleBlockClick = (userId: number) => {
    onBlock(userId);
    setExpanded(false);
  };

  /**
   * Handles the click event to stop propagation.
   * 
   * @param event The click event.
   */
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleAccordionChange}
        className={classes.accordion}
        disabled={user.isBlocked}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.accordionSummary}
          onClick={handleClick}
        >
          <div className={classes.summaryContent}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar alt={user.display_name} src={user.profile_image} />
              <Typography style={{ marginLeft: "8px" }}>
                {user.display_name}
              </Typography>
              {user.isFollowing && (
                <Tooltip title="Following">
                  <span className={classes.followingIcon}>⭐</span>
                </Tooltip>
              )}
              {user.isBlocked && <Typography>(Blocked)</Typography>}
            </div>
            {user.isFollowing && (
              <Button
                variant="contained"
                color={user.isFollowing ? "secondary" : "primary"}
                onClick={() => handleFollowClick(user.user_id)}
                disabled={user.isBlocked}
              >
                Unfollow
              </Button>
            )}
            <Typography>{user.reputation}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.buttonGroup}>
            <Button
              variant="contained"
              color={user.isFollowing ? "secondary" : "primary"}
              onClick={() => handleFollowClick(user.user_id)}
              disabled={user.isBlocked}
            >
              {user.isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleBlockClick(user.user_id)}
              disabled={user.isBlocked}
            >
              Block
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default UserAccordion;
