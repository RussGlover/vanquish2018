/* eslint-disable no-undef */
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from "@material-ui/core";
import TrafficIcon from "@material-ui/icons/Traffic";
import CwIcon from "@material-ui/icons/DirectionsWalk";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GradeIcon from "@material-ui/icons/Grade";
import GroupIcon from "@material-ui/icons/Group";
import WarningIcon from "@material-ui/icons/Warning";
import { appStep } from "./YourLocation";
import { withStyles } from "@material-ui/core/styles";
import ReactAnimatedWeather from "react-animated-weather";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    width: "20%"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class MapUIWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: null
    };
  }

  handlePanelExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  renderInfoPanel = () => {
    if (
      this.props.currentAppStep === appStep.WAITING_FOR_DESTINATION_SELECTION
    ) {
      return <Typography>Please select a destination</Typography>;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{ overflowY: "hidden" }}>
        <AppBar position="fixed" style={{ zIndex: 3 }}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              SafeStroll
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          anchor={"left"}
          open={this.props.isDrawerOpen}
          style={{ zIndex: 2, width: "20%" }}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} style={{ overflowY: "hidden" }} />
          <ExpansionPanel
            expanded={this.state.expanded === "panel1"}
            onChange={this.handlePanelExpand("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={8}>
                <Grid item>
                  <GradeIcon />
                </Grid>
                <Grid item>
                  <Typography variant="subheading">
                    Stroll Score: {this.props.routeScore}
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List dense>
                <ListItem>
                  <ListItemText primary="Controlled Intersections: 8/10" />
                  <ListItemIcon>
                    <TrafficIcon />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Crosswalk: 10/10" />
                  <ListItemIcon>
                    <CwIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.expanded === "panel2"}
            onChange={this.handlePanelExpand("panel2")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={8}>
                <Grid item>
                  <ReactAnimatedWeather icon={"RAIN"} size={24} />
                </Grid>
                <Grid item>
                  <Typography variant="subheading">Weather</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body1">
                The weather today is rainy.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.expanded === "panel3"}
            onChange={this.handlePanelExpand("panel3")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={8}>
                <Grid item>
                  <GroupIcon />
                </Grid>
                <Grid item>
                  <Typography variant="subheading">Social Strollers</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body1">
                Connect with your neighbours to plan a walking school bus
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.expanded === "panel4"}
            onChange={this.handlePanelExpand("panel4")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={8}>
                <Grid item>
                  <WarningIcon />
                </Grid>
                <Grid item>
                  <Typography variant="subheading">Report An Issue</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>Report an issue or concern on your route</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Drawer>
      </div>
    );
  }
}
export default withStyles(styles)(MapUIWrapper);
