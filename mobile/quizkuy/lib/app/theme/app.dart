import 'package:flutter/material.dart';
import './colors.dart';
import 'package:google_fonts/google_fonts.dart';

final ThemeData theme = ThemeData(
  primaryColor: ThemeColors.PRIMARY,
  accentColor: ThemeColors.ACCENT,
  textTheme: GoogleFonts.poppinsTextTheme(),
  fontFamily: 'poppins',
  focusColor: Colors.transparent,
  hoverColor: Colors.transparent,
  highlightColor: Colors.transparent,
  splashFactory: InkRipple.splashFactory,
);
