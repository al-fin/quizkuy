import 'package:flutter/material.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class CardList extends StatelessWidget {
  const CardList({
    Key key,
    @required this.title,
    @required this.items,
    this.headerBackgroundColor = ThemeColors.ACCENT,
    this.headerTextColor = Colors.white,
  }) : super(key: key);

  final String title;
  final List<String> items;
  final Color headerBackgroundColor;
  final Color headerTextColor;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.all(10),
          width: double.infinity,
          decoration: BoxDecoration(
            color: headerBackgroundColor,
            borderRadius: BorderRadius.vertical(top: Radius.circular(15)),
          ),
          child: Text(
            title,
            textAlign: TextAlign.center,
            style: ThemeTextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18,
              color: headerTextColor,
            ),
          ),
        ),
        Container(
          padding: EdgeInsets.all(10),
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(bottom: Radius.circular(15)),
            boxShadow: [
              BoxShadow(
                blurRadius: 6,
                offset: Offset(0, 6),
                color: Colors.black.withOpacity(0.15),
              )
            ],
          ),
          child: Column(
            children: [
              ListView.separated(
                separatorBuilder: (_, index) => Divider(
                  color: Colors.grey[400],
                ),
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: items.length,
                itemBuilder: (_, item) => Text(
                  items[item],
                  style: TextStyle(color: Colors.grey[700]),
                ),
              )
            ],
          ),
        ),
      ],
    );
  }
}
