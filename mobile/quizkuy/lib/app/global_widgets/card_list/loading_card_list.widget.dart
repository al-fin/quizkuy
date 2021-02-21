import 'package:flutter/material.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';
import 'package:shimmer/shimmer.dart';

class LoadingCardList extends StatelessWidget {
  const LoadingCardList({
    Key key,
    @required this.title,
    @required this.itemCount,
  }) : super(key: key);

  final String title;
  final int itemCount;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.all(10),
          width: double.infinity,
          decoration: BoxDecoration(
            color: ThemeColors.ACCENT,
            borderRadius: BorderRadius.vertical(top: Radius.circular(15)),
          ),
          child: Text(
            title,
            textAlign: TextAlign.center,
            style: ThemeTextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18,
              color: Colors.white,
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
          child: Shimmer.fromColors(
            baseColor: Colors.grey[300],
            highlightColor: Colors.grey[100],
            child: Column(
              children: [
                ListView.separated(
                  separatorBuilder: (_, index) => Divider(
                    color: Colors.grey[400],
                  ),
                  physics: NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: itemCount,
                  itemBuilder: (_, item) => Container(
                    height: 20,
                    width: 50,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
